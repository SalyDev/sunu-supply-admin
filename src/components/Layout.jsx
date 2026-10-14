import { NavLink, Outlet } from 'react-router-dom'
import {
  Logo, DashboardIcon, OrdersIcon, TagIcon, UsersIcon, CartIcon, TrendIcon, DollarIcon,
} from './Icons'
import { orderStats } from '../data/mock'

const pendingCount = orderStats.pending

const nav = [
  { to: '/', label: 'Dashboard', icon: DashboardIcon, end: true },
  { to: '/commandes', label: 'Commandes', icon: OrdersIcon, badge: pendingCount },
  { to: '/catalogue', label: 'Catalogue', icon: TagIcon },
  { to: '/clients', label: 'Clients', icon: UsersIcon },
  { to: '/approvisionnement', label: 'Approvisionnement', icon: CartIcon },
  { to: '/tendances', label: 'Tendances', icon: TrendIcon },
  { to: '/prix', label: 'Prix', icon: DollarIcon },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Logo />
        <div>
          <div className="sidebar-brand-name">Sunu Supply</div>
          <div className="sidebar-brand-sub">Admin</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {nav.map(({ to, label, icon: NavIcon, badge, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <NavIcon />
            <span>{label}</span>
            {badge > 0 && <span className="nav-badge">{badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="avatar" style={{ width: 32, height: 32, background: '#D6E8CF', color: '#1F5E3B', fontSize: 12 }}>MD</div>
        <div>
          <div className="sidebar-user-name">Mariama D.</div>
          <div className="sidebar-user-role">Administratrice</div>
        </div>
      </div>
    </aside>
  )
}

export default function Layout() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
