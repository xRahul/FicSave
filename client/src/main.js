// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueSocketIo from 'vue-socket.io';
import io from 'socket.io-client';
import Random from 'random-js';
import App from './App';

if (!Cookies.get('uuid')) {
  Cookies.set('uuid', Random.uuid4(Random.engines.browserCrypto), { expires: 7, path: '/' });
}

Vue.config.productionTip = false;
Vue.use(VueSocketIo, io.connect('http://localhost:3000', { query: `uuid=${encodeURIComponent(Cookies.get('uuid'))}` }));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
