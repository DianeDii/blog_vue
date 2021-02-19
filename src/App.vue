<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import home from './components/new_front/home.vue'

// 为了加深项目层级，App.vue 只是作为一个存放组件的容器：
export default {
  // components: {navMenu},
  name: 'App',
  components:{home}
}
</script>

<style>
</style>
