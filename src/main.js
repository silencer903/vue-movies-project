import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import MyPlugin from '@/plugins/api-worker-plugin.js'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.config.productionTip = false;
Vue.use(VueYouTubeEmbed);
Vue.use(MyPlugin);
router.saveScrollPosition = true;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
