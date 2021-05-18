import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Users = lazy(() => import('../pages/Users'))
const Project = lazy(() => import('../pages/Project'))
const Charts = lazy(() => import('../pages/Charts'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
export const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/projects',
    component: Project,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export const projectOwnerRoutes=[
  {
    path: '/projects',
    component: Project,
    
  },
  {
    path:'teams',
    component: Blank,
  },
  {
    path:'settings',
    component: Blank,
  }
]

export const UserRoutes = [
  {
    path: '/projects',
    component: Project,
    
  }
]


