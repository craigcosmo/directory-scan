
## What is this?

this package will take a directory (you give it) and scan recursively. The result is the entires directory structure under given one.

Example: if your project folder consists of this

```
projet root
    |app
        |component
            |action
            |reducer
    |css
    |image
```


```js
let directorMapped = dirScan.get('./')

console.log(directorMapped)

//output [
            'app',
            'app/component',
            'app/component/action',
            'app/component/reducer',
            'css',
            'image'
        ]
```

## Installation

`npm i --save-dev webpack-directory-scan`

## Usage

```js
import dirScan from 'webpack-directory-scan'

dirScan.get('./')

```

'./' is to get all folders and sub folders of folders in root directory. By default this package will ignore `node_modules` folder and `.git` folder


## Test

`npm test`