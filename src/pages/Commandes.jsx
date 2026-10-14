import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topbar from '../components/Topbar'
import { OrderStatus, PaymentStatus } from '../components/Badges'
import { SearchIcon, ChevronLeft, ChevronRight } from '../components/Icons'
import { orders, orderStats, ORDER_STATUS, F } from '../data/mock'

const stats = [
  { key: 'pending', label: 'En attente', color: '#E65100' },
  { key: 'confirmed', label: 'Confirmées', color: '#1F5E3B' },
  { key: 'shipping', label: 'En livraison', color: '#0D47A1' },
  { key: 'delivered', label: 'Livrées', color: '#2E7D32' },
]

export default function Commandes() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)

  const q = query.trim().toLowerCase()
  const rows = orders.filter((o) =>
    (status === 'all' || o.status === status) &&
    (!q || o.id.toLowerCase().includes(q) || o.client.toLowerCase().includes(q) || o.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''))),
  )

  return (
    <>
      <Topbar title="Commandes">
        <label className="search">
          <SearchIcon />
          <input placeholder="Rechercher…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <input type="date" className="select" style={{ paddingRight: 12, backgroundImage: 'none' }} aria-label="Filtrer par date" />
        <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Tous statuts</option>
          {Object.entries(ORDER_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </Topbar>

      <div className="content">
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', marginBottom: 20 }}>
          {stats.map((s) => (
            <div key={s.key} className="kpi" style={{ borderRadius: 10, padding: '14px 16px' }}>
              <div className="kpi-label" style={{ letterSpacing: '0.12em', marginBottom: 6 }}>{s.label}</div>
              <div className="kpi-value sm" style={{ color: s.color }}>{orderStats[s.key]}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'none' }}>
          <table className="table">
            <thead>
              <tr>
                <th>N°</th><th>Client</th><th>Montant</th><th>Livraison</th><th>Statut cmd</th><th>Paiement</th><th style={{ width: 44 }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id} className={`clickable${o.status === 'pending' ? ' highlight' : ''}`} onClick={() => navigate(`/commandes/${o.id}`)}>
                  <td className="ref">{o.id}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{o.client}</div>
                    <div className="sub">{o.phone}</div>
                  </td>
                  <td className="strong">{F(o.amount)}</td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{o.delivery}</td>
                  <td><OrderStatus status={o.status} /></td>
                  <td><PaymentStatus status={o.payment} orderStatus={o.status} /></td>
                  <td className="c" style={{ color: 'var(--muted)' }}><ChevronRight /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <div className="empty">Aucune commande ne correspond à ces filtres.</div>}
        </div>

        <div className="pager">
          <div>{orderStats.total} commandes au total</div>
          <div className="pager-btns">
            <button className="pager-btn" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft /></button>
            {[1, 2, 3].map((n) => (
              <button key={n} className={`pager-btn${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
            ))}
            <span style={{ padding: '0 6px' }}>…</span>
            <button className={`pager-btn${page === 7 ? ' active' : ''}`} onClick={() => setPage(7)}>7</button>
            <button className="pager-btn" disabled={page === 7} onClick={() => setPage(page + 1)}><ChevronRight /></button>
          </div>
        </div>
      </div>
    </>
  )
}
