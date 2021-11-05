import initData from "./initData.js"
import mount from "./compiler2/index.js"
import renderHelper from "./compiler2/renderHelper.js"
import patch from "./compiler2/patch.js"
/**
 * Vue 构造函数
 * @param {*} options new Vue(options) 时传递的配置对象
 */
export default function Vue(options) {
    this._init(options)
  }
  
/**
 * 初始化配置对象
 * @param {*} options 
 */
Vue.prototype._init = function (options) {
    // 将 options 配置挂载到 Vue 实例上
    this.$options = options
    // 初始化 options.data
    // 代理 data 对象上的各个属性到 Vue 实例
    // 给 data 对象上的各个属性设置响应式能力
    initData(this)

     // 安装运行时的渲染工具函数
  renderHelper(this)
  // 在实例上安装 patch 函数
  this.__patch__ = patch
     // 如果存在 el 配置项，则调用 $mount 方法编译模版
     if (this.$options.el) {
        this.$mount() 
      }
  }
  
  Vue.prototype.$mount = function () {
    mount(this)
  }
  
  /**
 * 负责执行 vm.$options.render 函数
 */
Vue.prototype._render = function () {
  // 给 render 函数绑定 this 上下文为 Vue 实例
  return this.$options.render.apply(this)
}

Vue.prototype._update = function (vnode) {
  // 老的 VNode
  const prevVNode = this._vnode
  // 新的 VNode
  this._vnode = vnode
  if (!prevVNode) {
    // 老的 VNode 不存在，则说明时首次渲染根组件
    this.$el = this.__patch__(this.$el, vnode)
  } else {
    // 后续更新组件或者首次渲染子组件，都会走这里
    this.$el = this.__patch__(prevVNode, vnode)
  }
}


    