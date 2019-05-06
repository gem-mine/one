const One = require('../src')

module.exports = function (options) {
  return function () {
    this.simple = {
      key: 'xxxxx',
      name: options.name
    }
  }
}
