import { createApp } from 'vue'
import pinia from './stores/pinia'
import App from './App.vue'
import router from './router'
import registerPublicComponents from './register'
import IviewUI from 'view-ui-plus'
import { getAssetFile } from './libs/util'
import 'mapbox-gl/dist/mapbox-gl.css'

import './assets/css/iconfont.css'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import './assets/css/style.less'

const app = createApp(App)

app.config.globalProperties.getAssetFile = getAssetFile

app.use(pinia)
app.use(router)
app.use(IviewUI)
  
registerPublicComponents(app)

app.mount('#app')
