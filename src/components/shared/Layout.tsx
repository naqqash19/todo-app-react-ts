import { Outlet } from 'react-router-dom'

import Nav from './Nav'

import { NavItem } from '../../types'

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Todos', path: '/todos' },
]

function Layout(): JSX.Element {
  return (
    <div>
      <Nav data={NAV_ITEMS} />
      <h1>Todo App</h1>
      <hr />

      <Outlet />
    </div>
  )
}

export default Layout
