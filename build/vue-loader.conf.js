var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('postcss-nested'),
    require('autoprefixer')({
      browsers: [
          'last 3 versions',
          'ie >= 9',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 34',
          'safari >= 6',
          'opera >= 12.1',
          'ios >= 6',
          'android >= 4.4',
          'bb >= 10',
          'and_uc >= 9.9'
        ]
    })
  ]
}
