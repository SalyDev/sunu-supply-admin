import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, PrintIcon, PhoneIcon, CheckIcon, PinIcon } from '../components/Icons'
import { orders, productById, F } from '../data/mock'

const steps = [
  { key: 'received', label: 'Reçue' },
  { key: 'pending', label: 'En attente' },
  { key: 'confirmed', label: 'Confirmée' },
  { key: 'shipping', label: 'En livraison' },
  { key: 'delivered', label: 'Livrée' },
]

const STATUS_PILL = {
  pending: { label: 'EN ATTENTE', bg: '#FFF3CD', color: '#856404' },
  confirmed: { label: 'CONFIRMÉE', bg: '#E8F5E9', color: '#1B5E20' },
  shipping: { label: 'EN LIVRAISON', bg: '#E3F2FD', color: '#0D47A1' },
  delivered: { label: 'LIVRÉE', bg: '#E8F5E9', color: '#2E7D32' },
  cancelled: { label: 'ANNULÉE', bg: '#FFEBEE', color: '#B71C1C' },
}

const actions = [
  { status: 'confirmed', label: 'Confirmer ✓', color: '#1F5E3B', bg: '#EFF5EF' },
  { status: 'shipping', label: 'En livraison 🛵', color: '#0066CC' },
  { status: 'delivered', label: 'Livrée ✓✓', color: '#388E3C' },
  { status: 'cancelled', label: 'Annuler', color: '#E2553B' },
]

function Timeline({ status }) {
  const current = steps.findIndex((s) => s.key === status)
  return (
    <div style={{ marginTop: 16, display: 'flex', alignItems: 'center' }}>
      {steps.map((s, i) => {
        const done = i < current || status === 'delivered'
        const active = i === current && status !== 'delivered'
        return (
          <div key={s.key} style={{ display: 'contents' }}>
            {i > 0 && <div style={{ flex: 1, height: 2, background: i <= current ? '#1F5E3B' : '#E5E0D4', marginBottom: 14 }} />}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {done ? (
                <div style={{ width: 28, height: 28, borderRadius: 14, background: '#1F5E3B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <CheckIcon />
                </div>
              ) : active ? (
                <div style={{ width: 28, height: 28, borderRadius: 14, background: '#FFF3CD', border: '2px solid #FFC107', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: '#FFC107' }} />
                </div>
              ) : (
                <div style={{ width: 28, height: 28, borderRadius: 14, background: '#F5F0E3', border: '2px solid #E5E0D4' }} />
              )}
              <span style={{ fontSize: 10, fontWeight: done || active ? 600 : 400, color: done ? '#1F5E3B' : active ? '#856404' : '#3F4F43', whiteSpace: 'nowrap' }}>
                {s.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function CommandeDetail() {
  const { id } = useParams()
  const order = orders.find((o) => o.id === id)
  const [status, setStatus] = useState(order?.status)

  if (!order) {
    return <div className="content"><div className="empty">Commande {id} introuvable. <Link to="/commandes" className="ref">Retour aux commandes</Link></div></div>
  }

  // Les commandes de démo sans détail complet réutilisent un contenu minimal
  const items = order.items ?? []
  const subtotal = items.reduce((sum, it) => sum + it.qty * it.unit, 0)
  const fee = order.deliveryFee ?? 0
  const pill = STATUS_PILL[status]

  return (
    <>
      <header className="topbar" style={{ minHeight: 56 }}>
        <div className="breadcrumb">
          <Link to="/commandes"><ArrowLeft /> Commandes</Link>
          <ChevronRight stroke="#E5E0D4" strokeWidth={2} />
          <strong>{order.id}</strong>
        </div>
        <div className="topbar-actions">
          <button className="btn" onClick={() => window.print()}><PrintIcon /> Imprimer</button>
          <a className="btn primary" href={`tel:${order.phone.replace(/\s/g, '')}`}><PhoneIcon /> Appeler client</a>
        </div>
      </header>

      <div className="content split" style={{ padding: '24px 28px' }}>
        <div className="col">
          <div className="card pad">
            <div className="row-between" style={{ marginBottom: 4 }}>
              <div className="topbar-title">Commande {order.id}</div>
              <div style={{ background: pill.bg, color: pill.color, borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}>{pill.label}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>
              {order.placedAt && <>Passée le <strong>{order.placedAt}</strong> · </>}
              Livraison prévue <strong>{order.slot ?? order.delivery}</strong>
            </div>
            {status !== 'cancelled' && <Timeline status={status} />}
          </div>

          <div className="card pad">
            <div className="card-title" style={{ marginBottom: 14 }}>Articles commandés</div>
            {items.length === 0 ? (
              <div className="note" style={{ background: 'var(--cream)' }}>Détail des articles non disponible pour cette commande de démonstration.</div>
            ) : (
              <table className="table detail">
                <thead>
                  <tr>
                    <th style={{ background: 'none', paddingLeft: 0 }}>Produit</th>
                    <th className="c" style={{ background: 'none' }}>Qté</th>
                    <th className="r" style={{ background: 'none' }}>P.U.</th>
                    <th className="r" style={{ background: 'none', paddingRight: 0 }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => {
                    const p = productById[it.product]
                    return (
                      <tr key={it.product}>
                        <td style={{ paddingLeft: 0, fontSize: 14 }}>
                          <div className="product">
                            <div className="product-icon" style={{ background: p.bg }}>{p.emoji}</div>
                            {p.name}
                          </div>
                        </td>
                        <td className="c" style={{ fontSize: 14 }}>{it.qty}</td>
                        <td className="r" style={{ fontSize: 14 }}>{F(it.unit)}</td>
                        <td className="r strong" style={{ fontSize: 14, paddingRight: 0 }}>{F(it.qty * it.unit)}</td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td colSpan={3} style={{ paddingLeft: 0, color: 'var(--muted)' }}>Livraison</td>
                    <td className="r" style={{ paddingRight: 0, color: 'var(--muted)' }}>{F(fee)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="card-title" style={{ paddingLeft: 0, border: 'none' }}>Total</td>
                    <td className="r" style={{ paddingRight: 0, border: 'none', fontWeight: 700, fontSize: 16, color: 'var(--green)' }}>{F(subtotal + fee)}</td>
                  </tr>
                </tbody>
              </table>
            )}
            {order.paymentMethod && (
              <div className="note" style={{ marginTop: 12, background: 'var(--cream)' }}>
                Paiement : <strong style={{ color: 'var(--ink)' }}>{order.paymentMethod}</strong>
              </div>
            )}
          </div>

          <div className="card pad">
            <div className="card-title" style={{ marginBottom: 14 }}>Mettre à jour le statut</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {actions.map((a) => (
                <button
                  key={a.status}
                  className="btn"
                  onClick={() => setStatus(a.status)}
                  style={{
                    borderColor: a.color, color: a.color, fontWeight: 600, padding: '8px 16px',
                    background: status === a.status ? (a.bg ?? '#F9F7F2') : 'white',
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="aside" style={{ width: 280 }}>
          <div className="card pad-sm">
            <div className="card-title" style={{ fontSize: 14, marginBottom: 14 }}>Client</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
              <div className="avatar" style={{ width: 40, height: 40, fontSize: 16, background: 'var(--green-mint)', color: 'var(--green)' }}>{order.client[0]}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{order.client}</div>
                {order.clientSince && <div style={{ fontSize: 12, color: 'var(--muted)' }}>Cliente depuis {order.clientSince}</div>}
              </div>
            </div>
            <div className="stack" style={{ gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--green)' }}>
                <PhoneIcon size={14} />
                <span style={{ fontSize: 13, color: 'var(--ink)' }}>{order.phone}</span>
              </div>
              {order.address && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: 'var(--green)' }}>
                  <PinIcon style={{ marginTop: 1, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--ink)' }}>{order.address.line}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{order.address.area}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {order.note && (
            <div className="card pad-sm">
              <div className="card-title" style={{ fontSize: 14, marginBottom: 10 }}>Note de livraison</div>
              <div className="note" style={{ background: '#FFF8E1', padding: '10px 12px' }}>"{order.note}"</div>
            </div>
          )}

          {order.history && (
            <div className="card pad-sm">
              <div className="card-title" style={{ fontSize: 14, marginBottom: 14 }}>Historique de {order.client.split(' ')[0]}</div>
              {[
                ['Commandes totales', order.history.orders],
                ['CA total', F(order.history.revenue)],
                ['Dernière commande', order.history.last],
              ].map(([k, v]) => (
                <div key={k} className="row-between" style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
