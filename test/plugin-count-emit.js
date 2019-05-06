const One = require('../src')

module.exports = function () {
  return function () {
    this.count = {
      add: n => {
        this.event.emit('increase', n || 1)
      },
      sub: n => {
        this.event.emit('decrease', n || 1)
      }
    }
  }
}
