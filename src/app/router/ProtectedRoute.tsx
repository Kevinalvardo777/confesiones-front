import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import SkeletonBlock from '@/shared/components/feedback/SkeletonBlock'
import { appRoutes } from '@/shared/constants/routes'

interface ProtectedRouteProps {
  roles?: Array<'user' | 'moderator' | 'admin'>
}

function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { isAuthenticated, isBootstrapping, user } = useAuth()

  if (isBootstrapping) {
    return <SkeletonBlock lines={4} />
  }

  if (!isAuthenticated) {
    return <Navigate to={appRoutes.login} replace />
  }

  if (roles?.length && (!user || !roles.includes(user.role as 'user' | 'moderator' | 'admin'))) {
    return <Navigate to={appRoutes.home} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
