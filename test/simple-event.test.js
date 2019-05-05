const One = require('../src')
const countPlugin = require('./plugin-count')
const countEmitPlugin = require('./plugin-count-emit')
const assert = require('assert')

describe('事件', () => {
  it('事件的使用', () => {
    const one = new One({
      data: {
        count: 10
      },
      plugins: {
        x: countPlugin(),
        y: countEmitPlugin()
      }
    })

    assert.equal(one.data.get('count'), 10)
    one.count.add()
    assert.equal(one.data.get('count'), 11)
    one.count.add(3)
    assert.equal(one.data.get('count'), 14)
    one.count.sub(4)
    assert.equal(one.data.get('count'), 10)
    one.count.sub()
    assert.equal(one.data.get('count'), 9)
  })
})
