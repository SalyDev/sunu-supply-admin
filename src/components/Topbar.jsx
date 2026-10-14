export default function Topbar({ title, subtitle, children, extra }) {
  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        {subtitle && <div className="topbar-sub">{subtitle}</div>}
      </div>
      {extra}
      {children && <div className="topbar-actions">{children}</div>}
    </header>
  )
}
