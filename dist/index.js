'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _recursiveReaddirSync = require('recursive-readdir-sync');

var _recursiveReaddirSync2 = _interopRequireDefault(_recursiveReaddirSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * recursively fetch system's directorry
 * @param {string} dir
 */

function findDup(arr) {

	var duplicates = [];
	var i = void 0,
	    j = void 0;
	for (i = 0, j = arr.length; i < j; i++) {
		if (duplicates.indexOf(arr[i]) === -1 && arr.indexOf(arr[i], i + 1) !== -1) {
			duplicates.push(arr[i]);
		}
	}
	return duplicates;
}
function pathToFileName(arr) {
	return arr.map(function (i) {
		return i.split('/').pop();
	});
}

module.exports = {
	get: function get(dir) {
		var excluded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

		var modules = [];
		var listF = [];
		var rootDirScan = _fs2.default.readdirSync(dir).filter(function (i) {
			return _fs2.default.statSync(dir + i).isDirectory();
		}).filter(function (i) {
			return !/^\.|node_modules/.test(i);
		}) // exclude .git and node_modules
		.filter(function (i) {
			if (excluded) {
				var regex = new RegExp(excluded);
				return !regex.test(i);
			} else {
				return true;
			}
		}).map(function (i) {
			var a = _glob2.default.sync(i + '/**/');
			// console.log('a',a)
			modules.push.apply(modules, _toConsumableArray(a));

			var d = _glob2.default.sync(i + '/**/*.*');
			listF.push.apply(listF, _toConsumableArray(d));
		});

		var duplicated = findDup(pathToFileName(listF));

		// console.log('d',duplicated)
		duplicated.length && console.log('there are duplicated files in your system: ', duplicated);
		return modules;
	}
};