import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '@/app/layouts/AppLayout'
import ProtectedRoute from '@/app/router/ProtectedRoute'
import AboutPage from '@/pages/AboutPage'
import CategoryPage from '@/pages/CategoryPage'
import ConfessionDetailPage from '@/pages/ConfessionDetailPage'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import ModerationPage from '@/pages/ModerationPage'
import RankingPage from '@/pages/RankingPage'
import RegisterPage from '@/pages/RegisterPage'
import SectionPage from '@/pages/SectionPage'
import { appRoutes } from '@/shared/constants/routes'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/categoria/:slug" element={<CategoryPage />} />
            <Route path={appRoutes.about} element={<AboutPage />} />
          <Route path={appRoutes.ranking} element={<RankingPage />} />
          <Route path="/comunidad/:communityId" element={<SectionPage />} />
          <Route path="/comunidad/:communityId/confesiones/:confessionSlug" element={<ConfessionDetailPage />} />
          <Route path={appRoutes.login} element={<LoginPage />} />
          <Route path={appRoutes.register} element={<RegisterPage />} />
          <Route element={<ProtectedRoute roles={['moderator', 'admin']} />}>
            <Route path={appRoutes.moderation} element={<ModerationPage />} />
          </Route>
          <Route path="*" element={<Navigate to={appRoutes.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
