import AuthProvider from '@/app/providers/AuthProvider'
import QueryProvider from '@/app/providers/QueryProvider'
import ThemeProvider from '@/app/providers/ThemeProvider'
import ToastProvider from '@/app/providers/ToastProvider'
import AppRouter from '@/app/router/AppRouter'

function App() {
  return (
    <div className="app-root">
      <ThemeProvider>
        <QueryProvider>
          <ToastProvider>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
          </ToastProvider>
        </QueryProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
