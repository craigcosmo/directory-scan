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