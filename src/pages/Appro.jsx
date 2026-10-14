import { useState } from 'react'
import Topbar from '../components/Topbar'
import { shoppingList as list, productById, fmt, CFA } from '../data/mock'

const kg = (n) => `${n.toLocaleString('fr-FR')} kg`

export default function Appro() {
  const [prices, setPrices] = useState({})
  const [saved, setSaved] = useState(false)

  const rows = list.items.map((it) => {
    const p = productById[it.product]
    const budget = Math.round(it.qty * p.market)
    const margin = Math.round(it.qty * (p.sale - p.market))
    return { ...it, p, budget, margin }
  })
  const totalKg = Math.round(rows.reduce((s, r) => s + r.qty, 0) * 10) / 10
  const totalBudget = rows.reduce((s, r) => s + r.budget, 0)
  const totalMargin = rows.reduce((s, r) => s + r.margin, 0)

  return (
    <>
      <Topbar title="Achats marché" subtitle={`${list.date} — basé sur les commandes confirmées`}>
        <button className="btn" onClick={() => window.print()}>📄 Imprimer la liste</button>
        <a className="btn primary" href="#saisie">✓ Saisir prix du marché</a>
      </Topbar>

      <div className="content split" style={{ padding: '24px 28px' }}>
        <div className="col">
          <div style={{ background: 'var(--green)', borderRadius: 12, padding: '18px 20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Commandes confirmées aujourd'hui</div>
              <div style={{ fontFamily: 'var(--serif)', fontWeight: 800, fontSize: 28 }}>{list.confirmedOrders} commandes</div>
              <div style={{ fontSize: 13, color: 'var(--green-light)', marginTop: 4 }}>Livraison prévue cet après-midi</div>
            </div>
            <div style={{ display: 'flex', gap: 28 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Budget d'achat estimé</div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 800, fontSize: 24 }}>{CFA(totalBudget)}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>prix marché × quantités</div>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Marge estimée</div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 800, fontSize: 24, color: 'var(--green-light)' }}>+ {CFA(totalMargin)}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>prix vente − prix marché</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ overflow: 'hidden' }}>
            <div className="card-head" style={{ padding: '16px 20px' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--green-dark)' }}>🛒 Liste d'achats du jour</div>
              <span className="badge pill b-neutral" style={{ fontWeight: 400 }}>Agrégé depuis les commandes</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th className="c">À acheter <span style={{ fontSize: 9, color: '#9B9B9B', textTransform: 'none', fontWeight: 400 }}>(+10% inclus)</span></th>
                  <th className="r">📋 Prix marché</th>
                  <th className="r">Budget estimé</th>
                  <th className="r">🏷️ Prix vente</th>
                  <th className="r" style={{ color: 'var(--green)' }}>💰 Marge estimée</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.product} style={{ background: i % 2 ? '#FAFAF8' : undefined }}>
                    <td className="product-name">{r.p.emoji} {r.p.name}</td>
                    <td className="c" style={{ fontWeight: 700, fontSize: 14, color: 'var(--green-dark)' }}>{kg(r.qty)}</td>
                    <td className="r" style={{ color: 'var(--muted)' }}>{fmt(r.p.market)} CFA/kg</td>
                    <td className="r strong">{CFA(r.budget)}</td>
                    <td className="r" style={{ color: 'var(--muted)' }}>{fmt(r.p.sale)} CFA/kg</td>
                    <td className="r pos">+ {CFA(r.margin)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ fontSize: 13, color: 'var(--muted)' }}>TOTAL</td>
                  <td className="c" style={{ fontWeight: 800, fontSize: 15, color: 'var(--green-dark)' }}>{kg(totalKg)}</td>
                  <td />
                  <td className="r" style={{ fontWeight: 800, fontSize: 14 }}>{CFA(totalBudget)}</td>
                  <td />
                  <td className="r" style={{ fontWeight: 800, fontSize: 14, color: 'var(--green)' }}>+ {CFA(totalMargin)}</td>
                </tr>
              </tfoot>
            </table>
            <div style={{ padding: '8px 16px', fontSize: 11, color: '#9B9B9B', borderTop: '1px solid var(--line-soft)' }}>
              * Quantités incluent +10% pour pertes éventuelles ou commandes de dernière minute. Marge estimée sur la base du prix marché (avant achat réel).
            </div>
          </div>
        </div>

        <div className="aside" style={{ width: 300 }}>
          <form
            id="saisie"
            className="card"
            style={{ padding: 18 }}
            onSubmit={(e) => { e.preventDefault(); setSaved(true) }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--green-dark)', marginBottom: 4 }}>Prix du marché ce matin</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Saisis après l'achat pour calculer la marge réelle</div>
            <div style={{ fontSize: 11, color: '#5FA83C', background: 'rgba(155,211,106,0.12)', borderRadius: 6, padding: '5px 8px', marginBottom: 10 }}>
              Par défaut : prix d'achat = prix marché estimé
            </div>
            <div className="stack" style={{ gap: 8 }}>
              {rows.map((r) => (
                <div key={r.product} className="row-between" style={{ gap: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)', flex: 1 }}>{r.p.emoji} {r.p.name} ({kg(r.qty)})</span>
                  <input
                    className="input"
                    type="number"
                    placeholder={String(r.p.market)}
                    style={{ width: 80, padding: '6px 8px', fontSize: 12, textAlign: 'right', borderRadius: 6 }}
                    value={prices[r.product] ?? ''}
                    onChange={(e) => { setSaved(false); setPrices({ ...prices, [r.product]: e.target.value }) }}
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="btn primary block" style={{ marginTop: 14 }}>
              {saved ? '✓ Prix enregistrés' : 'Enregistrer les prix'}
            </button>
          </form>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--green-dark)', marginBottom: 12 }}>Achats récents</div>
            <div className="stack" style={{ gap: 10 }}>
              {list.recent.map((h) => (
                <div key={h.date} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '10px 12px' }}>
                  <div className="row-between" style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green-dark)' }}>{h.date}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)' }}>{CFA(h.amount)}</span>
                  </div>
                  <div className="sub">
                    {h.orders} commandes · {h.kg} kg · <span style={{ color: 'var(--green)', fontWeight: 600 }}>marge +{CFA(h.margin)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
