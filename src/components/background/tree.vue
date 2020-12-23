<template>
  <!-- tree和datalist就是兄弟组件，他们有共同的爸爸b_index（传值/调接口/展示）（富文本） -->
    <div id="tree">
            <el-row class="tac">
  <el-col :span="12">
    <el-menu
      default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#E9EEF3"
      router
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/backindex" @click="getnav(1)">
        <i class="el-icon-menu"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="/backindex" @click="getnav(2)">
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
      getnav(id){
        this.$store.commit('getnavdata',id)
      }
    }

}
</script>

<style>
#tree{
        position: relative;
        float: left;
        width: 15%;
        margin-left: 0%;
}
</style>