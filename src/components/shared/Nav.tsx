import { Link } from 'react-router-dom'

import { useAuth, useAuthData } from '../../context/auth-context'

import { NavItem } from '../../types'

type NavProps = {
  data: NavItem[]
}

function Nav({ data }: NavProps): JSX.Element {
  const auth = useAuth()
  const authData = useAuthData()

  return (
    <nav>
      <ul>
        {data.map(({ path, name }, idx) => (
          <li key={idx}>
            <Link to={path}>{name}</Link>
          </li>
        ))}
        <li>
          {authData.user !== null ? (
            <button onClick={async () => await auth.signOut()}>Sign Out</button>
          ) : (
            <Link to='/signin'>Sign In</Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Nav
