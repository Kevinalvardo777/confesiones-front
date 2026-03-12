import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from '../../components/AppShell/AppShell'
import { ConfessionsProvider } from '../../features/confessions/ConfessionsProvider/ConfessionsProvider'
import AboutPage from '../../pages/AboutPage/AboutPage'
import HomePage from '../../pages/HomePage/HomePage'
import RankingPage from '../../pages/RankingPage/RankingPage'
import SectionPage from '../../pages/SectionPage/SectionPage'
import './App.scss'

function App() {
  return (
    <ConfessionsProvider>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<HomePage />} />
              <Route path="/seccion/:sectionId" element={<SectionPage />} />
              <Route path="/ranking" element={<RankingPage />} />
              <Route path="/nosotros" element={<AboutPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ConfessionsProvider>
  )
}

export default App
