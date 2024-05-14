import './assets/main.css'

// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import './assets/less/index.less'
import {useMeanStore} from './store/menus.ts'

const app = createApp(App)
app.use(createPinia())

const meanStore = useMeanStore()
router.addRoute(meanStore.menuList)
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.mount('#app')