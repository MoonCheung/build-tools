import Vue from 'vue';
import $ from 'jquery';
import { main } from './main';

// 全局样式
import './component.scss';
import './index.scss';

const version = Number(Vue.version.split('.')[0]);

console.log('cat 版本:', version);

console.log('cat jquery版本', $().jquery);

console.log('cat main:', main);

new Vue({
  el: '#app'
});