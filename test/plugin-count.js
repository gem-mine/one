const One = require('../src')

module.exports = function (count) {
  if (typeof count === 'number') {
    this.data.set('count', count)
  }

  return function () {
    this.event.on(
      'increase',
      function (n) {
        this.data.set('count', this.data.get('count') + (n || 1))
      },
      this
    )

    this.event.on(
      'decrease',
      function (n) {
        this.data.set('count', this.data.get('count') - (n || 1))
      },
      this
    )
  }
}
