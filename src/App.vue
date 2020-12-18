<template>
  <div id="app">
      <el-container>
        <el-header><navMenu></navMenu><span id="loginbtn" v-show="isshow"><router-link to="/login" @click="tohide()">登录</router-link></span></el-header>
        <el-main><router-view></router-view></el-main>
        <el-footer>form dianedii</el-footer>
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
    tohide(){
      this.isshow =false
    }
  }
}
</script>

<style>
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
