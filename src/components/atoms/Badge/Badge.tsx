import { Link } from 'react-router-dom'
import './Badge.scss'

interface BadgeProps {
  children: React.ReactNode
  accent?: boolean
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

function Badge({ children, accent = false, to, href, onClick, type = 'button' }: BadgeProps) {
  const className = `atom-badge${accent ? ' atom-badge--accent' : ''}${to || href || onClick ? ' atom-badge--interactive' : ''}`

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  if (onClick) {
    return (
      <button type={type} className={className} onClick={onClick}>
        {children}
      </button>
    )
  }

  return <span className={className}>{children}</span>
}

export default Badge
