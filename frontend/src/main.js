import { createApp } from 'vue'
import router from '@/routes'
import App from '@/App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vuex
import store from '@/store'

const vuetify = createVuetify({ components, directives })

createApp(App).use(router).use(vuetify).use(store).mount('#app')
