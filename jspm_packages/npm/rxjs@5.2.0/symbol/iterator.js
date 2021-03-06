/* */ 
"use strict";
var root_1 = require('../util/root');
function symbolIteratorPonyfill(root) {
  var Symbol = root.Symbol;
  if (typeof Symbol === 'function') {
    if (!Symbol.iterator) {
      Symbol.iterator = Symbol('iterator polyfill');
    }
    return Symbol.iterator;
  } else {
    var Set_1 = root.Set;
    if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
      return '@@iterator';
    }
    var Map_1 = root.Map;
    if (Map_1) {
      var keys = Object.getOwnPropertyNames(Map_1.prototype);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
          return key;
        }
      }
    }
    return '@@iterator';
  }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.$$iterator = symbolIteratorPonyfill(root_1.root);
