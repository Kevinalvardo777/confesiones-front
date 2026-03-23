import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import './FormField.scss'

interface FormFieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  footer?: ReactNode
  children: ReactNode
}

function FormField({ id, label, hint, error, footer, children }: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const footerId = footer ? `${id}-footer` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, footerId, errorId].filter(Boolean).join(' ') || undefined
  const field =
    isValidElement(children)
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          'aria-describedby': describedBy,
          'aria-errormessage': errorId,
          'aria-invalid': error ? true : undefined,
        })
      : children

  return (
    <div className="molecule-field">
      <label className="molecule-field__label" htmlFor={id}>
        {label}
      </label>
      {field}
      {footer ? (
        <div id={footerId} aria-live="polite">
          {footer}
        </div>
      ) : null}
      {hint ? (
        <p id={hintId} className="molecule-field__hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="molecule-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default FormField
