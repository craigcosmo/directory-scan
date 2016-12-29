// var recur = require('../dist/index.js')
var recur = require('../index.js')

var expect = require('chai').expect
import {assert} from 'chai'


describe('test recur modules', function () {
	it('should return an array of directories in this project', () => {
		let array = recur.get('./')
		console.log(array)
		expect(array).is.an('array')
	})	
});
