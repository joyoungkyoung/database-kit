import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './pages'
import RoutesString from './routesString'

const router = new createRouter({ history: createWebHashHistory(), routes })

router.beforeEach(async (to) => {
  const canAccess = to ? true : false
  if (!canAccess) return RoutesString.Login
})

export default router
