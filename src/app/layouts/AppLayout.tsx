import { NavLink, Outlet, useLocation } from 'react-router-dom'
import HeroBanner from '@/components/organisms/HeroBanner/HeroBanner'
import Badge from '@/components/atoms/Badge/Badge'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Button from '@/shared/components/ui/Button'
import { appRoutes } from '@/shared/constants/routes'
import { useTheme } from '@/shared/hooks/useTheme'
import { useToast } from '@/shared/hooks/useToast'
import './AppLayout.scss'

const navLinks = [
  { to: appRoutes.home, label: 'Inicio' },
  { to: appRoutes.ranking, label: 'Ranking' },
  { to: appRoutes.about, label: 'Nosotros' },
]

function AppLayout() {
  const { isAuthenticated, logout, user, loginAsGuest } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()
  const location = useLocation()
  const isHomePage = location.pathname === appRoutes.home

  return (
    <div className="app-layout">
      <a className="app-layout__skip-link" href="#main-content">
        Saltar al contenido principal
      </a>
      <header className={`app-layout__hero surface-panel${isHomePage ? '' : ' app-layout__hero--compact'}`}>
        <nav className="app-layout__nav" aria-label="Navegacion principal">
          <div className="app-layout__brand">
            <strong>Confesiones EC</strong>
            <span>Historias por comunidad</span>
          </div>

          <div className="app-layout__nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === appRoutes.home}
                className={({ isActive }) => `app-layout__nav-link${isActive ? ' app-layout__nav-link--active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="app-layout__actions">
            <Button variant="ghost" onClick={toggleTheme} aria-label="Cambiar tema">
              {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            </Button>
            {isAuthenticated ? (
              <>
                <span className="app-layout__user">{user?.name}</span>
                {user?.role === 'moderator' || user?.role === 'admin' ? (
                  <NavLink to={appRoutes.moderation} className="app-layout__nav-link">
                    Moderacion
                  </NavLink>
                ) : null}
                <Button variant="secondary" onClick={() => void logout()}>
                  Salir
                </Button>
              </>
            ) : (
              <>
                <NavLink to={appRoutes.login} className="app-layout__nav-link">
                  Ingresar
                </NavLink>
                <NavLink to={appRoutes.register} className="app-layout__nav-link">
                  Registro
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {isHomePage ? (
          <HeroBanner
            eyebrow="Confesiones por sector en Ecuador"
            title="Historias anonimas, rumores y verdades que solo se cuentan dentro de cada comunidad."
            description="Explora iglesias, empresas, hospitales y otros entornos locales. Entra a tu comunidad y mira lo que realmente se comenta ahi."
            aside={
              <>
                <Badge
                  accent
                  onClick={() => {
                    void loginAsGuest().catch((error: unknown) => {
                      showToast({
                        title: error instanceof Error ? error.message : 'No pudimos entrar como invitado.',
                        tone: 'error',
                      })
                    })
                  }}
                >
                  Entrar anonimo
                </Badge>
                <Badge href="#campus-map">Ver categorias</Badge>
                <Badge to={appRoutes.ranking}>Ir al ranking</Badge>
              </>
            }
          />
        ) : null}
      </header>

      <main id="main-content" className="app-layout__content" tabIndex={-1}>
        <Outlet />
      </main>

      <nav className="app-layout__bottom-nav surface-panel" aria-label="Navegacion rapida movil">
        {navLinks.map((link) => (
          <NavLink
            key={`mobile-${link.to}`}
            to={link.to}
            end={link.to === appRoutes.home}
            className={({ isActive }) =>
              `app-layout__bottom-link${isActive ? ' app-layout__bottom-link--active' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default AppLayout
