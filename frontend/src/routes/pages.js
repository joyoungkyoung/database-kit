import siteLogin from '@/views/siteLogin.vue'
import RoutesString from './routesString'

export const routes = [
  { path: RoutesString.Home, redirect: RoutesString.Login },
  { path: RoutesString.Login, component: siteLogin },
  { path: RoutesString.Schema, component: null }
]
