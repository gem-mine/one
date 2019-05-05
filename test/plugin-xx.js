const One = require('../src')

module.exports = One.fn.addPlugin(function (options) {
  return function () {
    this.xx = {
      key: 'xxxxx',
      name: options.name
    }
  }
})
