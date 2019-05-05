const One = require('../src')
const simplePlugin = require('./plugin-simple')
const assert = require('assert')

describe('自定义插件', () => {
  it('在初始化加载', () => {
    const s = simplePlugin({
      name: 'cow'
    })

    const one = new One({
      plugins: {
        hehe: s
      }
    })

    assert.equal(one.getPlugin('hehe'), s)
    assert.equal(one.simple.key, 'xxxxx')
    assert.equal(one.simple.name, 'cow')
  })

  it('在运行时加载', () => {
    const y = simplePlugin({
      name: 'beef'
    })

    const one = new One()

    one.runPlugin('haha', y)

    assert.equal(one.getPlugin('haha'), y)
    assert.equal(one.simple.key, 'xxxxx')
    assert.equal(one.simple.name, 'beef')
  })
})
