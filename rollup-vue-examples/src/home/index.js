import Vue from 'vue';
import App from './App.vue';
import router from './router';
import $ from 'jquery';
import { main } from './main';

// 全局样式
import './styles/component.scss';
import './styles/index.scss';

const version = Number(Vue.version.split('.')[0]);

console.log('cat 版本:', version);

console.log('cat jquery版本', $().jquery);

console.log('cat main:', main);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');