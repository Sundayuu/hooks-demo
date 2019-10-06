const routes = []

const homeRoutes = [
  //首页
  { path: '/home', exact: true, asyncComponent: () => import('./pages/home') },
  { path: '/notFound', asyncComponent: () => import('./components/notFound') }
]

export { routes, homeRoutes }
