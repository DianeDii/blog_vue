<template>
  <div id="login">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.pwd" type="password"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录
        </el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
data() {
      return {
        form: {
          name: '',
          pwd: '',
        },
        iscurrent: false
      }
    },
    methods: {
      onSubmit() {
        if(this.form.name == "diane" && this.form.pwd == "diane"){
          window.location.href = "#/backindex";
          console.log('submit!');
        }else{
            window.alert("用户名/密码输入有误！")
        }
      },

    }
}
</script>

<style>
    #login{
        margin-top: 5%;
        margin-left: 40%;
        width: 20%;
    }
</style>