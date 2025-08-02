import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import './style.css'
import 'primeicons/primeicons.css'

import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Password from 'primevue/password'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.component('ButtonComponent', Button)
app.component('InputText', InputText)
app.component('SelectComponent', Select)
app.component('PasswordComponent', Password)

app.mount('#app')
