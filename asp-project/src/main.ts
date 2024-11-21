import './assets/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapVue3 from 'bootstrap-vue-3';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(BootstrapVue3)
app.mount('#app')
