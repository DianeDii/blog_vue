<template>
  <div id="app">
      <el-container>
        <el-header><navMenu></navMenu></el-header>
        <el-main><router-view></router-view></el-main>
        <el-footer> <el-link type="info" @click="tologin" v-show="isshow">from dianedii</el-link></el-footer>
      </el-container>
  </div>
</template>

<script>

import navMenu from './components/frontground/navMenu.vue'


export default {
  components: {navMenu},
  name: 'App',
  data(){
    return{
      isshow: true 
    }
  },
  methods: {
    tologin(){
        this.$router.push({
          path:'/login'
        })
      this.isshow = false
    }
  }
}
</script>

<style>
@import './common/font/font.css';
  body{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  .el-header, .el-footer {
    background-color: #409EFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }
    #loginbtn{
    position: relative;
    float: right;
  }

</style>
