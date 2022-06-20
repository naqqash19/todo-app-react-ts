import { Navigate, useLocation } from 'react-router-dom'

import { useAuthData } from '../../context/auth-context'

type RequireAuthProps = {
  children: JSX.Element
}

function RequireAuth({ children }: RequireAuthProps): JSX.Element {
  const location = useLocation()

  const authData = useAuthData()

  if (authData.user === null)
    return <Navigate to='/signin' state={{ from: location }} replace />

  return children
}

export default RequireAuth
