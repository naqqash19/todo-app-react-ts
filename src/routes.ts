import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Todos from './pages/Todos'
import NotFound from './pages/NotFound'

type Route = {
  path: string
  element: any
  requireAuth: boolean
}

const routes: Route[] = [
  { path: '/', element: Home, requireAuth: false },
  { path: '/signin', element: SignIn, requireAuth: false },
  { path: '/todos', element: Todos, requireAuth: true },
  { path: '*', element: NotFound, requireAuth: false },
]

export default routes
