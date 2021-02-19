<template>
  <div id="login">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.username"></el-input>
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
import cookie from '../../utils/cookie'
export default {
data() {
      return {
        form: {
          username: '',
          pwd: '',
        },
        iscurrent: false
      }
    },
    methods: {
      onSubmit() {
        // let params= new URLSearchParams()
        // params.append('username',this.form.username)
        // params.append('pwd',this.form.pwd)
        this.axios({
          url:'/user/login',
          method: 'post',
          data: this.form,
          headers:{token:'',client:''}
        }).then(res =>{
          if(res.data.data === null){
            window.alert("用户名或密码错误！")
            console.log("用户名或密码错误！")
          }else{
          console.log("登录成功")
          cookie.setCookie(res.data.data,1)
          console.log(res)
          window.location.href = "/backindex"; 
          }
          
        },function(error){
          console.log(error.res)
        })
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