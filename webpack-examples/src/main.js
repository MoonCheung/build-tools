require('./style/style.less');

const format = require('utils/format')
const log = require('log');

log(format('hello webpack Demo!!!'));
/*global _:true*/
log(_.map([1,2,3], (item)=> item * 2));

/*global TWO:true*/
log(TWO);
/*global CONSTANTS:true*/
log(CONSTANTS.APP_VERSIION)