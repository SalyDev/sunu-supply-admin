import { useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import { trends, productById, F } from '../data/mock'

const PERIODS = [
  { key: 7, label: '7 jours', title: '7 derniers jours' },
  { key: 30, label: '30 jours', title: '30 derniers jours' },
  { key: 90, label: '3 mois', title: '3 derniers mois' },
]

const TREND = {
  up: { label: '↑ hausse', style: { background: '#FFEBEE', color: '#B71C1C' } },
  'strong-up': { label: '↑ forte hausse', style: { background: '#FFEBEE', color: '#B71C1C' } },
  down: { label: '↓ baisse', style: { background: '#D4EDDA', color: '#155724' } },
  stable: { label: '→ stable', style: { background: '#F5F0E3', color: '#3F4F43' } },
}

const ALERT = {
  ok: { color: '#43A047', title: 'OK' },
  watch: { color: '#FFC107', title: 'Surveiller' },
  adjust: { color: '#E2553B', title: 'Ajuster prix' },
}

function changeBadge(change) {
  if (change > 0) return { label: `↑ ${change}%`, style: { background: '#FFEBEE', color: '#B71C1C' } }
  if (change < 0) return { label: `↓ ${-change}%`, style: { background: '#D4EDDA', color: '#155724' } }
  return { label: '→ 0%', style: { background: '#F5F0E3', color: '#3F4F43' } }
}

function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`
}

function Sparkline({ values, color }) {
  const step = 200 / (values.length - 1)
  const pts = values.map((y, i) => `${Math.round(i * step)},${y}`).join(' ')
  return (
    <svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none">
      <polyline points={`${pts} 200,40 0,40`} fill={hexToRgba(color, 0.08)} stroke="none" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default function Tendances() {
  const [period, setPeriod] = useState(7)
  const current = PERIODS.find((p) => p.key === period)
  const alert = trends.table.find((t) => t.alert === 'adjust')

  return (
    <>
      <Topbar title="Tendances marché">
        {PERIODS.map((p) => (
          <button key={p.key} className={`btn${p.key === period ? ' toggle-on' : ''}`} onClick={() => setPeriod(p.key)}>
            {p.label}
          </button>
        ))}
      </Topbar>

      <div className="content stack">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {trends.sparklines.map((s) => {
            const p = productById[s.product]
            const b = changeBadge(s.change)
            return (
              <div key={s.product} className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div className="product-icon" style={{ width: 28, height: 28, borderRadius: 7, background: p.bg, fontSize: 14 }}>{p.emoji}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div className="badge pill" style={{ marginLeft: 'auto', padding: '2px 8px', fontSize: 11, fontWeight: 700, ...b.style }}>{b.label}</div>
                </div>
                <Sparkline values={s.points[period]} color={s.color} />
                <div className="row-between" style={{ marginTop: 6 }}>
                  <div className="sub">Marché Thiaroye</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{F(s.price)}/kg</div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--cream)' }}>
            <div className="card-title">Prix marché vs. nos prix de vente ({current.title})</div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Produit</th>
                <th className="r">Prix achat moy.</th>
                <th className="r">Notre prix vente</th>
                <th className="r">Marge</th>
                <th className="r">Tendance achat</th>
                <th className="c">Alerte</th>
              </tr>
            </thead>
            <tbody>
              {trends.table.map((t) => (
                <tr key={t.name}>
                  <td className="strong" style={{ fontSize: 14 }}>{t.name}</td>
                  <td className="r" style={{ fontSize: 14 }}>{F(t.purchase)}</td>
                  <td className="r strong" style={{ fontSize: 14 }}>{F(t.sale)}</td>
                  <td className="r strong" style={{ fontSize: 14, color: t.alert === 'adjust' ? 'var(--red)' : 'var(--green)' }}>+{t.margin}%</td>
                  <td className="r"><span className="badge pill" style={{ padding: '2px 8px', ...TREND[t.trend].style }}>{TREND[t.trend].label}</span></td>
                  <td className="c">
                    <div title={ALERT[t.alert].title} style={{ width: 8, height: 8, borderRadius: 4, background: ALERT[t.alert].color, margin: '0 auto' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {alert && (
            <div style={{ padding: '10px 20px', background: '#FFF8E1', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--red)', flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                <strong style={{ color: 'var(--ink)' }}>Alerte {alert.name} :</strong> le prix d'achat a augmenté de 32% cette semaine — pensez à ajuster votre prix de vente ou à consulter la page{' '}
                <Link to="/prix" className="ref">Suggestion prix</Link>.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
