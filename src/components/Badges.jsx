import { ORDER_STATUS, PAYMENT_STATUS } from '../data/mock'

export function OrderStatus({ status }) {
  const s = ORDER_STATUS[status]
  return <span className={`badge ${s.cls}`}>{s.label}</span>
}

export function PaymentStatus({ status, orderStatus }) {
  const s = PAYMENT_STATUS[status]
  // Une commande annulée affiche son paiement en rouge (cf. maquette Commandes)
  const cls = orderStatus === 'cancelled' ? 'b-cancel' : s.cls
  return <span className={`badge ${cls}`}>{s.label}</span>
}

export function PurchaseTag({ market, purchase }) {
  return purchase > market
    ? <span className="badge tiny b-red">↑ marché</span>
    : <span className="badge tiny b-brand">= marché</span>
}
