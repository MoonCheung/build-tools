import css from './css/index.css';
import less from './css/black.less';
import scss from './css/bb.scss';
import jspang from './index.js';


{
	let HelloWeb = "Hello Webpack 继续学习Vue框架"
	document.getElementById('title').innerHTML = HelloWeb;
}
// jspang();

$('#title').html('Hello webpack Jquery');

var json = require('../config.json');
document.getElementById('json').innerHTML = json.name + " ,website:" + json.webSite;