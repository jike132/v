/**
 * @param {*} vm Vue 实例
 */
import Watcher from "../watcher.js"
export default function mountComponent(vm) {
    // 更新组件的的函数
    const updateComponent = () => {
      vm._update(vm._render())
    }
  
    // 实例化一个渲染 Watcher，当响应式数据更新时，这个更新函数会被执行
    new Watcher(updateComponent)
  }
  
  