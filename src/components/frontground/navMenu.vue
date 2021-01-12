<template>
  <div id="navMenu">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#409EFF" text-color="#fff"
  active-text-color="#ffd04b">
        <el-menu-item index="1" @click="tofresh">首页</el-menu-item>
        <el-menu-item index="2">技术博客</el-menu-item>
        <el-menu-item index="3">随笔</el-menu-item>
        <el-menu-item index="4">实验室</el-menu-item>
        <el-menu-item index="5">关于我</el-menu-item>
    </el-menu>
    
<div class="line"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      
        if(key == "1"){
          this.$router.push({
                path:'/index',
            })
        }else if(key =="2"){
          this.$router.push({
                path:'/blog',
            })
        }else if(key =="3"){
          this.$router.push({
                path:'/life',
            })
        }else if(key =="4"){
          this.$router.push({
                path:'/labor',
            })
        }else {
          this.$router.push({
                path:'/about',
            })
        }
      },
      tofresh(){
        window.location.reload()
      }
      
    }
  }
</script>

<style>
    #navMenu {
        width: 50%;
        margin-right: 20%;
    }

</style>