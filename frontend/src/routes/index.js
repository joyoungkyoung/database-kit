import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './pages'
import RoutesString from './routesString'
import store from '@/store'

const router = new createRouter({ history: createWebHashHistory(), routes })

const guardCheck = (path) => {
  if (path === RoutesString.Login || path === RoutesString.Home) return true
  return false
}
router.beforeEach(async (to) => {
  const { accessToken } = store.state.user
  const canAccess = guardCheck(to.path) || accessToken ? true : false

  if (!canAccess) return RoutesString.Login
})

export default router
