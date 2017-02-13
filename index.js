import fs from 'fs'
import glob from 'glob'


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
function fileNameFromPathName(arr){
	return arr.map( i => i.split('/').pop())
}

module.exports = {
	get : (dir, excluded='') => {

		excluded = excluded.constructor === Array ? excluded.join('|') : excluded

		let regex = new RegExp( excluded )
		let directories = []
		let pathNames =[]

		fs.readdirSync(dir)
			.filter( i => fs.statSync(dir+i).isDirectory() )
			.filter( i => !/^\.|node_modules/.test(i) ) // exclude .git and node_modules
			.filter( i => {
				if (excluded.length) {
					return !regex.test(i)
				}else{
					return true
				}
			})
			.map(i => { 
				let a = glob.sync(i+'/**/')
				// console.log('a',a)
				directories.push(...a)

				let d = glob.sync(i+'/**/*.*')
				pathNames.push(...d)
			})

		let duplicated = findDup(fileNameFromPathName(pathNames))

		// console.log('d',duplicated)
		duplicated.length && console.log('Found duplicated file names: \n\n' +'['+ duplicated+']'+'\n' )
		return directories
	}
}

