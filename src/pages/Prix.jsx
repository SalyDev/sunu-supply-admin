import { useState } from 'react'
import Topbar from '../components/Topbar'
import { PurchaseTag } from '../components/Badges'
import { priceSuggestions, productById, CFA, fmt } from '../data/mock'

const TARGETS = [150, 200, 300, 400]

export default function Prix() {
  const [target, setTarget] = useState(200)
  // Prix de vente courant et prix choisi, par produit
  const [sales, setSales] = useState(() => Object.fromEntries(priceSuggestions.map((s) => [s.product, s.sale])))
  const [choices, setChoices] = useState({})

  const rows = priceSuggestions.map((s) => {
    const p = productById[s.product]
    const sale = sales[s.product]
    const margin = sale - s.purchase
    const below = margin < target
    const choice = choices[s.product] ?? (below ? s.suggested : sale)
    return { ...s, p, sale, margin, below, choice }
  })
  const belowRows = rows.filter((r) => r.below)

  const apply = (list) => {
    setSales((prev) => ({ ...prev, ...Object.fromEntries(list.map((r) => [r.product, Number(r.choice)])) }))
    setChoices((prev) => {
      const next = { ...prev }
      list.forEach((r) => delete next[r.product])
      return next
    })
  }

  const statusNote = (r) => {
    if (!r.below) return { text: `✓ ${r.margin > target * 2.5 ? 'Excellente marge' : r.margin >= target * 1.5 ? 'Bonne marge' : 'Dans la cible'}`, color: 'var(--green)' }
    if (r.purchase > r.market) {
      const pct = Math.round(((r.purchase - r.market) / r.market) * 100)
      return { text: pct > 30 ? `⚠ Coût en hausse +${pct}%` : '⚠ Marge sous la cible', color: 'var(--red)' }
    }
    return { text: '⚠ Marge sous la cible', color: 'var(--red)' }
  }

  return (
    <>
      <Topbar title="Suggestion de prix de vente">
        <span style={{ fontSize: 12, color: 'var(--grey)' }}>Marge cible :</span>
        <select
          className="select"
          style={{ borderColor: 'var(--green)', color: 'var(--green)', fontWeight: 700, padding: '5px 30px 5px 10px' }}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
        >
          {TARGETS.map((t) => <option key={t} value={t}>+{t} CFA/kg</option>)}
        </select>
        <button className="btn primary" disabled={!belowRows.length} onClick={() => apply(belowRows)}>Appliquer les suggestions</button>
      </Topbar>

      <div className="legend" style={{ margin: '14px 28px 0', background: 'white', border: '1px solid var(--line)', borderRadius: 10, padding: '11px 16px', fontSize: 12 }}>
        <span>📋 <b>Prix marché</b> = estimation avant le jour J</span>
        <span>🛒 <b>Prix d'achat</b> = réel le jour J</span>
        <span>🏷️ <b>Prix de vente</b> affiché sur le site</span>
        <span>💰 <b>Marge</b> = vente − achat</span>
        {belowRows.length > 0 && (
          <span className="badge b-red" style={{ marginLeft: 'auto', padding: '4px 10px' }}>
            ⚠ {belowRows.length} produit{belowRows.length > 1 ? 's' : ''} en-dessous de la marge cible
          </span>
        )}
      </div>

      <div className="content" style={{ paddingTop: 12 }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Produit</th>
                <th className="r">📋 Marché</th>
                <th className="r">🛒 Achat</th>
                <th className="r" style={{ color: 'var(--green-dark)' }}>🏷️ Vente actuelle</th>
                <th className="c" style={{ color: 'var(--green)' }}>💰 Marge actuelle</th>
                <th className="r">Prix suggéré</th>
                <th className="r">Votre choix</th>
                <th className="c">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const note = statusNote(r)
                return (
                  <tr key={r.product} className={r.below ? 'warn' : undefined}>
                    <td>
                      <div className="product">
                        <div className="product-icon" style={{ background: r.p.bg }}>{r.p.emoji}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{r.p.name}</div>
                          <div style={{ fontSize: 11, fontWeight: 500, color: note.color }}>{note.text}</div>
                        </div>
                      </div>
                    </td>
                    <td className="r grey">{CFA(r.market)}</td>
                    <td className="r">
                      <span className={r.purchase > r.market ? 'neg' : 'grey'}>{CFA(r.purchase)}</span>
                      <PurchaseTag market={r.market} purchase={r.purchase} />
                    </td>
                    <td className="r strong" style={{ color: 'var(--green-dark)' }}>{CFA(r.sale)}</td>
                    <td className="c">
                      <span className={`badge ${r.below ? 'b-red' : 'b-brand'}`} style={{ fontSize: 13, fontWeight: 700, padding: '3px 10px' }}>+{CFA(r.margin)}</span>
                    </td>
                    <td className="r" style={r.below ? { fontWeight: 700, color: 'var(--green)' } : { color: 'var(--grey)' }}>{CFA(r.suggested)}</td>
                    <td className="r">
                      <input
                        className="input"
                        type="number"
                        value={r.choice}
                        onChange={(e) => setChoices({ ...choices, [r.product]: e.target.value })}
                        aria-label={`Prix choisi pour ${r.p.name}`}
                        style={{
                          width: 96, textAlign: 'center', padding: '5px 10px',
                          ...(r.below
                            ? { border: '2px solid var(--green)', color: 'var(--green)', fontWeight: 700, boxShadow: '0 0 0 3px rgba(31,94,59,0.08)' }
                            : { border: '1.5px solid var(--line)' }),
                        }}
                      />
                    </td>
                    <td className="c">
                      {r.below || Number(r.choice) !== r.sale
                        ? <button className="btn sm primary" onClick={() => apply([r])}>Appliquer</button>
                        : <button className="btn sm" onClick={() => setChoices({ ...choices, [r.product]: r.sale })}>Garder</button>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="row-between" style={{ padding: '12px 20px', background: 'var(--cream)' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {belowRows.length > 0 ? (
                <>
                  <span style={{ color: 'var(--red)', fontWeight: 600 }}>{belowRows.length} produit{belowRows.length > 1 ? 's' : ''}</span> en-dessous de la marge cible
                  {' '}({belowRows.map((r) => `${r.p.name} +${fmt(r.margin)} CFA`).join(', ')})
                  {belowRows.some((r) => r.purchase > r.market) && <> — prix d'achat &gt; prix marché estimé</>}
                </>
              ) : (
                <span style={{ color: 'var(--green)', fontWeight: 600 }}>✓ Tous les produits atteignent la marge cible</span>
              )}
            </div>
            {belowRows.length > 0 && (
              <button className="btn primary" style={{ boxShadow: '0 2px 8px rgba(31,94,59,0.2)' }} onClick={() => apply(belowRows)}>
                Appliquer les {belowRows.length} ajustement{belowRows.length > 1 ? 's' : ''} →
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
