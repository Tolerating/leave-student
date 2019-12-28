import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import { MessageBox } from 'mint-ui'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import animate from 'animate.css'
Vue.prototype.$ajax = axios
Vue.use(animate)
Vue.use(MintUI)
Vue.config.productionTip = false
Vue.prototype.baseUrl = "http://118.25.137.129:35651/leave"
Vue.prototype.notLogin = function(e){
  MessageBox.confirm('请重新登录').then(function(response) {
    localStorage.isLogin = false;
    localStorage.token = "";
    e.$router.push('login');
  }).catch(function(error){

  }); 
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
