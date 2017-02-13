'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
function fileNameFromPathName(arr) {
	return arr.map(function (i) {
		return i.split('/').pop();
	});
}

module.exports = {
	get: function get(dir) {
		var excluded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


		excluded = excluded.constructor === Array ? excluded.join('|') : excluded;

		var regex = new RegExp(excluded);
		var directories = [];
		var pathNames = [];

		_fs2.default.readdirSync(dir).filter(function (i) {
			return _fs2.default.statSync(dir + i).isDirectory();
		}).filter(function (i) {
			return !/^\.|node_modules/.test(i);
		}) // exclude .git and node_modules
		.filter(function (i) {
			if (excluded.length) {
				return !regex.test(i);
			} else {
				return true;
			}
		}).map(function (i) {
			var a = _glob2.default.sync(i + '/**/');
			// console.log('a',a)
			directories.push.apply(directories, _toConsumableArray(a));

			var d = _glob2.default.sync(i + '/**/*.*');
			pathNames.push.apply(pathNames, _toConsumableArray(d));
		});

		var duplicated = findDup(fileNameFromPathName(pathNames));

		// console.log('d',duplicated)
		duplicated.length && console.log('Found duplicated file names: \n\n' + '[' + duplicated + ']' + '\n');
		return directories;
	}
};