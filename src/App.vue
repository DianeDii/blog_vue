<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

import home from './components/new_front/home.vue'

// 为了加深项目层级，App.vue 只是作为一个存放组件的容器：
export default {
  // components: {navMenu},
  name: 'App',
  components:{home},
  provide() {
        return {
            reloadAll: this.reloadAll,
            IsPC: this.IsPC
        }
    },
  data() {
      return {
          isRouterAlive: true,
      }
  },
  created(){
    // if(this.IsPC() == false){
    //  非PC端访问可以做二级子域名，即 m.dianedii.top ，
    // }
  },
  methods: {
      reloadAll() {
          this.isRouterAlive = false
          this.$nextTick(() => {
              this.isRouterAlive = true
          })
      },
      IsPC() {
          var userAgentInfo = navigator.userAgent;
          var Agents = ["Android", "iPhone",
                      "SymbianOS", "Windows Phone",
                      "iPad", "iPod"];
          var flag = true;
          for (var v = 0; v < Agents.length; v++) {
              if (userAgentInfo.indexOf(Agents[v]) > 0) {
                  flag = false;
                 break;
             }
         }
         return flag;
      }
  },
}
</script>

<style>
</style>
