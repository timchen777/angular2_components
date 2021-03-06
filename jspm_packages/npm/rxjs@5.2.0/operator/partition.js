/* */ 
"use strict";
var not_1 = require('../util/not');
var filter_1 = require('./filter');
function partition(predicate, thisArg) {
  return [filter_1.filter.call(this, predicate, thisArg), filter_1.filter.call(this, not_1.not(predicate, thisArg))];
}
exports.partition = partition;
