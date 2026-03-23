import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App/App'
import '@/shared/styles/global.scss'
import '@/shared/styles/app.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
