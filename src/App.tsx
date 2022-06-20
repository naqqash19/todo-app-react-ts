import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/auth-context'

import PageLayout from './components/shared/Layout'

import RequireAuth from './components/shared/RequireAuth'

import routes from './routes'

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PageLayout />}>
          {routes.map(({ path, element: Element, requireAuth }, idx) => (
            <Route
              key={idx}
              path={path}
              element={
                requireAuth ? (
                  <RequireAuth>
                    <Element />
                  </RequireAuth>
                ) : (
                  <Element />
                )
              }
            />
          ))}
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
