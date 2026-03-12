import { NavLink, Outlet } from 'react-router-dom'
import './AppShell.scss'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/ranking', label: 'Ranking' },
  { to: '/nosotros', label: 'Nosotros' },
]

function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-shell__hero">
        <div className="app-shell__hero-copy">
          <span className="app-shell__eyebrow">Confesiones universitarias</span>
          <h1>Historias anónimas con secciones, filtros y ranking real.</h1>
          <p>
            Publica por campus, encuentra la mejor confesión con estrellas y navega por comunidades como ESPOL, UCG
            y UDLA.
          </p>
        </div>
        <nav className="app-shell__nav" aria-label="Navegacion principal">
          <div className="app-shell__brand">Campus Secret</div>
          <div className="app-shell__nav-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `app-shell__nav-link${isActive ? ' app-shell__nav-link--active' : ''}`}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell
