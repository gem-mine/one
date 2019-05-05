const One = require('../src')
const xxPlugin = require('./plugin-xx')
const assert = require('assert')

describe('自定义插件', () => {
  it('在初始化加载', () => {
    const xx = xxPlugin({
      name: 'cow'
    })

    const one = new One({
      plugins: {
        hehe: xx
      }
    })

    assert.equal(one._plugins.hehe, xx)
    assert.equal(one.xx.key, 'xxxxx')
    assert.equal(one.xx.name, 'cow')
  })

  it('在运行时加载', () => {
    const yy = xxPlugin({
      name: 'beef'
    })

    const one = new One()

    one.runPlugin('haha', yy)

    assert.equal(one._plugins.haha, yy)
    assert.equal(one.xx.key, 'xxxxx')
    assert.equal(one.xx.name, 'beef')
  })
})
