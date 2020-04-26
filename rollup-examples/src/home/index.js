import './index.scss';
import Vue from 'vue';

const version = Number(Vue.version.split('.')[0]);

console.log('cat 版本:', version);

new Vue();