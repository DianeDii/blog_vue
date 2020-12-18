<template>
  <!-- tree和datalist就是兄弟组件，他们有共同的爸爸b_index（传值/调接口/展示）（富文本） -->
    <div id="tree">
      <h2>{{getvuexdata}}</h2>
            <el-row class="tac">
  <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#E9EEF3"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="1" @click="tofatherdata($event)">
        <i class="el-icon-menu"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
    </div>
</template>

<script>
export default {
    name:"tree",

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }

}
</script>

<style>
#tree{
        position: relative;
        float: left;
        width: 20%;
        margin-left: 0%;
}
</style>