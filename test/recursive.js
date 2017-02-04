
// import dirScan from '../dist/index.js'

import dirScan from '../index.js'
import {expect, assert} from 'chai'


describe('testing directory scan package', function () {
	it('should return a list of directories', () => {
		let array = dirScan.get('./')
		// console.log(array)
		expect(array).is.an('array')
	})
	it('should exclude the directory "folders"', function () {
		let array = dirScan.get('./', 'folders')
		expect(array).to.not.include('folders/')
	})
	it('should exclude an array of directory', function () {
		let array = dirScan.get('./', ['folder', 'test'])
		expect(array).to.not.include('folders/')
		expect(array).to.not.include('test/')
	})
})
