const One = require('../src')

module.exports = One.fn.addPlugin(function (options) {
  return function () {
    this.simple = {
      key: 'xxxxx',
      name: options.name
    }
  }
})
