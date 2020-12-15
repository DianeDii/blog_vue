<template>
  <div id="navMenu">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#409EFF" text-color="#fff"
  active-text-color="#ffd04b">
        <el-menu-item index="1"><router-link to="/index">首页</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="/blog">技术博客</router-link></el-menu-item>
        <el-menu-item index="3"><router-link to="/life">随笔</router-link></el-menu-item>
        <el-menu-item index="4"><router-link to="/labor">实验室</router-link></el-menu-item>
        <el-menu-item index="5"><router-link to="/about">关于我</router-link></el-menu-item>
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