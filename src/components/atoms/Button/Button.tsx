import type { ButtonHTMLAttributes } from 'react'
import './Button.scss'

export type AtomButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AtomButtonVariant
  fullWidth?: boolean
}

function Button({ variant = 'primary', fullWidth = false, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`atom-button atom-button--${variant}${fullWidth ? ' atom-button--full' : ''} ${className}`.trim()}
      {...props}
    />
  )
}

export default Button
