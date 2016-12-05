# Cordova Webpack Plugin
A simple plugin to output your Webpack project as a Cordova project.

## Installing
```sh
npm install cordova-webpack-plugin --save
```

## Usage
Add the plugin to your required modules in `webpack.config.js`
```js
var CordovaWebpackPlugin = require('cordova-webpack-plugin');
```

Add the plugin to your Webpack plugins
```js
config.plugins = [
    new CordovaWebpackPlugin({
        output: 'dist',                 /* Specify the output folder */
        config: 'cordova-config.xml',   /* The source config for cordova which will be copied to the output folder as 'config.xml' */
        index: 'src/static/index.html', /* The source index.html which will be copied to the <output folder>/www/ folder as 'index.html' */
        disabled: false                 /* (optional) Boolean value to conditionally run the plugin */
    })
];
```

## License
[MIT](/LICENSE)

## Note
This plugin is based on [webpack-cordova-plugin](https://github.com/markmarijnissen/webpack-cordova-plugin/). It did not do what I wanted and the plugin seemed to be abandoned, so I made my own.