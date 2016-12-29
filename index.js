import fs from 'fs'
import path from 'path'
import glob from 'glob'
import recursiveReadSync from 'recursive-readdir-sync'
/**
 * recursively fetch system's directorry
 * @param {string} dir
 */

function findDup(arr) {
	let valuesSoFar = Object.create(null);
	let du=[]
	for (var i = 0; i < arr.length; ++i) {
		var value = arr[i];
		if (value in valuesSoFar) {
			du.push(value)
		}
		valuesSoFar[value] = true;
	}
	return du;
}

module.exports = {
	get : (dir) => {
		let modules = []
		let rootDirScan = fs.readdirSync(dir)
								.filter( i => fs.statSync(dir+i).isDirectory() )
								.filter( i => !/^\.|node_modules/.test(i) ) // exclude .git and node_modules
								.map( i => i+'/**/') // adding the glob's pattern to the directories
								.map(i => { 
									let a = glob.sync(i)
									// console.log('a',a)
									modules.push(...a)
								})


		let fileList = recursiveReadSync('dist');
		// console.log('a',fileList)
		let fileNames = fileList.map( i => i.split("/").pop())
		// console.log('f',fileNames)
		let duplicated = findDup(fileNames)
		// console.log('d',duplicated)
		// duplicated.length && console.log('there is duplicate file in your system:',duplicated )
		return modules
	}
}


