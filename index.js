import fs from 'fs'
import path from 'path'
import glob from 'glob'

/**
 * recursively fetch system's directorry
 * @param {string} dir
 */

module.exports = {
	get : (dir) => {
		let modules = []
		let rootDirScan = fs.readdirSync(dir)
								.filter( i => fs.statSync(dir+i).isDirectory() )
								.filter( i => !/^\.|node_modules/.test(i) ) // exclude .git and node_modules
								.map( i => i+'/**/') // adding the glob's pattern to the directories
								.map(i => { 
									let a = glob.sync(i)
									modules.push(...a)
								})
		modules.push('node_modules')

		return modules
	}
}


