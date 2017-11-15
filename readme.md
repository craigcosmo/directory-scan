
## What is this?

This package will take a directory and scan recursively. The result is an array of child directories

Example: say your folder structure is like this

```
projet root
    |app
        |component
            |action
            |reducer
    |css
    |image
    package.json
```

`directory-scan` will get you something like below

```js
[
    'app',
    'app/component',
    'app/component/action',
    'app/component/reducer',
    'css',
    'image'
]
```

## Installation

`npm i --save-dev directory-scan`

## Usage

#### Basic

```js
import dirScan from 'directory-scan'
```

dirScan.get('./')

//output 
```
[
    'app',
    'app/component',
    'app/component/action',
    'app/component/reducer',
    'css',
    'image'
]
```

`./` is to get all folders and sub folders of folders in root directory. 

By default this package will automatically exclude `node_modules` folder and `.git` folder

#### Exclude folder from scan

```js
import dirScan from 'directory-scan'

dirScan.get('./', 'css')
```


//output 
```
[
    'app',
    'app/component',
    'app/component/action',
    'app/component/reducer',
    'image'
]

```

This will scan every folders in your root except `css` folder

```js
import dirScan from 'directory-scan'

dirScan.get('./', ['css','image'])
```


//output 
```
[
    'app',
    'app/component',
    'app/component/action',
    'app/component/reducer'
]

```

This will scan every folders in your root except `css` and `image` folder

## Test

`npm test`