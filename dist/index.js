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
	var valuesSoFar = Object.create(null);
	var du = [];
	for (var i = 0; i < arr.length; ++i) {
		var value = arr[i];
		if (value in valuesSoFar) {
			du.push(value);
		}
		valuesSoFar[value] = true;
	}
	return du;
}

module.exports = {
	get: function get(dir) {
		var modules = [];
		var rootDirScan = _fs2.default.readdirSync(dir).filter(function (i) {
			return _fs2.default.statSync(dir + i).isDirectory();
		}).filter(function (i) {
			return !/^\.|node_modules/.test(i);
		}) // exclude .git and node_modules
		.map(function (i) {
			return i + '/**/';
		}) // adding the glob's pattern to the directories
		.map(function (i) {
			var a = _glob2.default.sync(i);
			// console.log('a',a)
			modules.push.apply(modules, _toConsumableArray(a));
		});

		var fileList = (0, _recursiveReaddirSync2.default)('dist');
		// console.log('a',fileList)
		var fileNames = fileList.map(function (i) {
			return i.split("/").pop();
		});
		// console.log('f',fileNames)
		var duplicated = findDup(fileNames);
		// console.log('d',duplicated)
		// duplicated.length && console.log('there is duplicate file in your system:',duplicated )
		return modules;
	}
};