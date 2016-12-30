import fs from 'fs'
import path from 'path'
import glob from 'glob'
import recursiveReadSync from 'recursive-readdir-sync'
/**
 * recursively fetch system's directorry
 * @param {string} dir
 */

function findDup(arr) {

	let duplicates = []
	let i, j
	for (i = 0, j = arr.length; i < j; i++) {
		if (duplicates.indexOf(arr[i]) === -1 && arr.indexOf(arr[i], i+1) !== -1) {
			duplicates.push(arr[i])
		}
	}
	return duplicates
}
function pathToFileName(arr){
	return arr.map( i => i.split('/').pop())
}

module.exports = {
	get : (dir, excluded='') => {
		let modules = []
		let listF =[]
		let rootDirScan = fs.readdirSync(dir)
								.filter( i => fs.statSync(dir+i).isDirectory() )
								.filter( i => !/^\.|node_modules/.test(i) ) // exclude .git and node_modules
								.filter( i => {
									if (excluded) {
										let regex = new RegExp( excluded )
										return !regex.test(i)
									}else{
										return true
									}
								})
								.map(i => { 
									let a = glob.sync(i+'/**/')
									// console.log('a',a)
									modules.push(...a)

									let d = glob.sync(i+'/**/*.*')
									listF.push(...d)
								})

		let duplicated = findDup(pathToFileName(listF))

		// console.log('d',duplicated)
		duplicated.length && console.log('there are duplicated files in your system: ',duplicated )
		return modules
	}
}

