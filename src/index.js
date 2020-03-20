(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.ViewEffect = factory());
}(this, (function () { 'use strict';

	var a = 1;
	console.log(a);

	return a;

})));
