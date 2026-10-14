import { useState } from 'react'
import Topbar from '../components/Topbar'
import { SearchIcon, ChevronLeft, ChevronRight } from '../components/Icons'
import { clients, clientStats as s, CLIENT_STATUS, F } from '../data/mock'

const SORTS = {
  recent: { label: 'Plus récents', fn: () => 0 },
  orders: { label: 'Nb commandes', fn: (a, b) => b.orders - a.orders },
  revenue: { label: 'CA total', fn: (a, b) => b.revenue - a.revenue },
  name: { label: 'Nom', fn: (a, b) => a.name.localeCompare(b.name) },
}

export default function Clients() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('recent')
  const [page, setPage] = useState(1)

  const q = query.trim().toLowerCase()
  const rows = clients
    .filter((c) => !q || c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q) || c.phone.includes(q))
    .sort(SORTS[sort].fn)

  const stats = [
    { label: 'Clients actifs', value: s.active, note: 'ce mois' },
    { label: 'Nouveaux', value: `+${s.new}`, note: 'ce mois' },
    { label: 'Panier moyen', value: F(s.avgBasket), note: 'par commande' },
    { label: 'Fidélité moy.', value: s.loyalty, note: 'cmd/client/mois' },
  ]

  return (
    <>
      <Topbar title="Clients" extra={<span className="badge pill" style={{ background: 'var(--green-pale)', color: 'var(--green)' }}>{s.total} clients</span>}>
        <label className="search">
          <SearchIcon />
          <input placeholder="Rechercher un client…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Trier par">
          {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>Trier par : {v.label}</option>)}
        </select>
      </Topbar>

      <div className="content">
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', marginBottom: 16 }}>
          {stats.map((st) => (
            <div key={st.label} className="card" style={{ borderRadius: 10, padding: '14px 20px' }}>
              <div className="kpi-label" style={{ fontWeight: 600, letterSpacing: '0.06em', marginBottom: 4 }}>{st.label}</div>
              <div className="kpi-value sm">{st.value}</div>
              <div className="sub" style={{ marginTop: 2 }}>{st.note}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Client</th><th>Quartier</th><th className="c">Commandes</th><th className="r">CA total</th><th>Dernière cmd</th><th className="c">Statut</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => {
                const st = CLIENT_STATUS[c.status]
                return (
                  <tr key={c.phone} className="clickable">
                    <td>
                      <div className="product">
                        <div className="avatar" style={{ background: c.color[0], color: c.color[1] }}>{c.name[0]}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                          <div className="sub">{c.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td>{c.area}</td>
                    <td className="c strong" style={{ fontSize: 14 }}>{c.orders}</td>
                    <td className="r strong" style={{ fontSize: 14 }}>{F(c.revenue)}</td>
                    <td style={{ color: 'var(--muted)' }}>{c.last}</td>
                    <td className="c"><span className="badge pill" style={st.style}>{st.label}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {rows.length === 0 && <div className="empty">Aucun client trouvé.</div>}
          <div className="pager" style={{ margin: 0, padding: '12px 20px', borderTop: '1px solid var(--cream)', fontSize: 12 }}>
            <div>Affichage 1–{rows.length} sur {s.total} clients</div>
            <div className="pager-btns">
              <button className="pager-btn" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft size={12} /></button>
              {[1, 2, 3].map((n) => (
                <button key={n} className={`pager-btn${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="pager-btn" disabled={page === 3} onClick={() => setPage(page + 1)}><ChevronRight size={12} /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
