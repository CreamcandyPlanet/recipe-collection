import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 导入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.scss'

const app = createApp(App)
// 创建 Pinia 并注册插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia) // 改用注册后的 pinia 实例
app.use(router)
app.use(ElementPlus)

// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')