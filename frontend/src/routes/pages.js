import RoutesString from './routesString'
import siteLogin from '@/views/siteLogin.vue'
import schemaList from '@/views/schemaList.vue'

export const routes = [
  { path: RoutesString.Home, redirect: RoutesString.Login },
  { path: RoutesString.Login, component: siteLogin },
  { path: RoutesString.Schema, component: schemaList }
]
