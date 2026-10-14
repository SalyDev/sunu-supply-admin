import { Link, useNavigate } from 'react-router-dom'
import Topbar from '../components/Topbar'
import { OrderStatus, PaymentStatus } from '../components/Badges'
import { dashboard as d, orders, F } from '../data/mock'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <Topbar title="Dashboard" subtitle={d.date}>
        <select className="select" defaultValue="week">
          <option value="today">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
        </select>
        <select className="select" defaultValue="all">
          <option value="all">Toutes variétés</option>
          <option>Légumes-feuilles</option>
          <option>Légumes-fruits</option>
          <option>Racines</option>
          <option>Aromates</option>
        </select>
      </Topbar>

      <div className="content">
        <div className="section-label">Ventes</div>

        <div className="kpis" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', marginBottom: 12 }}>
          {/* CA total = ventes légumes + frais livraison facturés */}
          <div className="kpi">
            <div className="kpi-label">CA total</div>
            <div className="kpi-value">{F(d.revenue.total)}</div>
            <div className="kpi-note">
              Légumes <b>{F(d.revenue.vegetables)}</b><br />
              Livraisons facturées <b>{F(d.revenue.delivery)}</b>
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Coût d'achat</div>
            <div className="kpi-value" style={{ color: 'var(--muted)' }}>{F(d.purchaseCost)}</div>
            <div className="kpi-note">Légumes uniquement<br /><span className="dim">Hors frais de livraison</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Gains nets</div>
            <div className="kpi-value">+{F(d.netGain)}</div>
            <div className="kpi-note">
              Marge légumes : <span style={{ fontWeight: 600, color: '#5FA83C' }}>{d.margin}</span><br />
              <span className="dim">Hors frais de livraison</span>
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Pertes</div>
            <div className="kpi-value" style={{ color: 'var(--red)' }}>{F(d.losses)}</div>
            <div className="kpi-note">Légumes invendus / gaspillés<br /><span className="dim">Hors frais de livraison</span></div>
          </div>
        </div>

        <div className="kpis" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginBottom: 20 }}>
          <div className="kpi">
            <div className="kpi-label">Nb commandes</div>
            <div className="kpi-value">{d.ordersCount}</div>
            <div className="kpi-note" style={{ fontSize: 12 }}>Cette semaine</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Panier moyen</div>
            <div className="kpi-value">{F(d.avgBasket)}</div>
            <div className="kpi-note" style={{ fontSize: 12 }}>Légumes uniquement · par commande</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Résultat livraisons</div>
            <div className="kpi-value" style={{ color: 'var(--muted)' }}>{F(d.deliveryResult)}</div>
            <div className="kpi-note">
              Coût total : {d.ordersCount} × {F(d.deliveryUnit)}<br />
              <span className="dim">Non inclus dans les gains nets</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'none' }}>
          <div className="card-head">
            <div className="card-title">Commandes récentes</div>
            <Link to="/commandes" style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>Voir toutes →</Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>N°</th><th>Client</th><th>Montant</th><th>Livraison</th><th>Statut</th><th>Paiement</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 3).map((o) => (
                <tr key={o.id} className="clickable" onClick={() => navigate(`/commandes/${o.id}`)}>
                  <td className="ref">{o.id}</td>
                  <td style={{ fontWeight: 500 }}>{o.client}</td>
                  <td className="strong">{F(o.amount)}</td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{o.deliveryShort}</td>
                  <td><OrderStatus status={o.status} /></td>
                  <td><PaymentStatus status={o.payment} orderStatus={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
