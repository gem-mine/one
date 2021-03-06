const EventEmitter = require('eventemitter3')

const One = function (options) {
  const { plugins, data } = options || {}
  const _data = Object.assign({}, data) // 缓存共享数据

  // 插件集
  _private(this, '_plugins', {})
  // 事件机制
  _private(this, 'event', new EventEmitter())
  // 共享数据的操作
  _private(
    this,
    'data',
    Object.freeze({
      get: key => {
        return _data[key]
      },
      set: (key, val) => {
        _data[key] = val
      },
      del: key => {
        delete _data[key]
      }
    })
  )

  if (plugins) {
    for (const key in plugins) {
      if (plugins.hasOwnProperty(key)) {
        const plugin = plugins[key]
        _detect(key, plugin, this._plugins)
        plugin.call(this)
      }
    }
  }
}

// 提供简写，方便插件注册
One.fn = One.prototype

One.fn.addPlugin = function (plugin) {
  return plugin.bind(this)
}
One.fn.runPlugin = function (key, plugin) {
  _detect(key, plugin, this._plugins)
  plugin.call(this)
}
One.fn.getPlugin = function (key) {
  return this._plugins[key]
}

function _detect(key, plugin, plugins) {
  if (plugins[key]) {
    throw new Error(`插件名称 ${key} 已经被注册，请更换`)
  }
  plugins[key] = plugin
}

function _private(obj, key, value) {
  return Object.defineProperty(obj, key, {
    get() {
      return value
    },
    set() {
      throw new Error(`${key} 是受保护属性，禁止重写`)
    }
  })
}

module.exports = One
