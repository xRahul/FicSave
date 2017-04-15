// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueSocketIo from 'vue-socket.io';
import App from './App';

Vue.config.productionTip = false;
Vue.use(VueSocketIo, 'http://localhost:3000');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
