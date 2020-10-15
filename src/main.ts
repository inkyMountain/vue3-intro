import { createApp } from "vue";
import App from "./App.vue";

// Vue2 中根组件从语法层面来说和其他组件没有区别，只是被约定俗称为 app。
// Vue3 提出了 app 的概念，指令与组件的注册都以 app 为单位。
// 这意味着可以拥有多个 app 实例，每个实例拥有各自注册的指令和组件。
const app = createApp(App);

/**
 * 指令注册的变化：
 * 1. vm 实例从 vnode 上，移动到了 binding 中。
 * 2. 统一指令与组件的生命周期命名。
 */
app.directive('my-directive', {
  beforeMount(el, binding, vnode, prevVnode) { },
  mounted(el, binding, vnode, prevVnode) {
    console.log('my directive runs');
    console.log('binding.instance', binding.instance);
  },
  beforeUpdate() { },
  updated() { },
  beforeUnmount() { },
  unmounted() { }
});
app.mount("#app");
