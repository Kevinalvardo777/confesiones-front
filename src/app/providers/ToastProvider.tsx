import { useMemo, useState, type ReactNode } from 'react'
import { ToastContext, type ToastContextValue, type ToastMessage } from '@/app/providers/ToastContext'
import './toast.scss'

function createToastId() {
  return `toast-${Math.random().toString(36).slice(2, 10)}`
}

function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const value = useMemo<ToastContextValue>(
    () => ({
      showToast: (message) => {
        const nextMessage = {
          ...message,
          id: createToastId(),
        }

        setMessages((current) => [...current, nextMessage])

        window.setTimeout(() => {
          setMessages((current) => current.filter((item) => item.id !== nextMessage.id))
        }, 3200)
      },
    }),
    [],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-viewport" aria-live="polite" aria-atomic="true">
        {messages.map((message) => (
          <article key={message.id} className={`toast toast--${message.tone}`}>
            <strong>{message.title}</strong>
          </article>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
