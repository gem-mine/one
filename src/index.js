const One = function (options) {
  const { plugins } = options || {}

  this._plugins = {}

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

/**
 * 插件只是进行了 bind
 */
One.prototype.addPlugin = function (plugin) {
  return plugin.bind(this)
}

/**
 * 直接运行插件，用于 one 已经被初始化的情况
 */
One.prototype.runPlugin = function (key, plugin) {
  _detect(key, plugin, this._plugins)

  plugin.call(this)
}

// 提供简写，方便插件注册
One.fn = One.prototype

function _detect(key, plugin, plugins) {
  if (plugins[key]) {
    throw new Error(`插件名称 ${key} 已经被注册，请更换`)
  }
  plugins[key] = plugin
}

module.exports = One
