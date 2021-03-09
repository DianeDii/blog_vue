<template>
  <div id="detail">
      <div id="background"></div>
      <div id="content">
        <router-view></router-view> 
        <h2 v-if="articledetail != null" v-html="articledetail[0]"></h2><br>
        <p v-if="articledetail != null" v-html="articledetail[1]"></p>
        <br>
        <span v-if="articledetail != null">{{articledetail[2]}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh">版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）</a></span>
      </div>
      <div id="SOHUCS" v-if="commentState"></div> 
  </div>
 
</template>

<script>
import comments from '../../utils/comments'
export default {
    data(){
        return{
            articledetail: null,
            commentState: true,
        }
    },
    mounted(){
        comments.addcomment();
    },
    created(){
        this.axios.get('/blog/isSecret?artID='+this.$route.params.id).then(res =>{
            if(res.data.data == true){
                this.commentState =false
                this.$prompt('该文章被加密', '请输入密码', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                
                }).then(({ value }) => {
                    // console.log("执行解密接口")
                    // 构造一下传入的参数（value，artID）
                    var idAndPwd ={artId:this.$route.params.id ,pwd:value}
                    // console.log(idAndPwd)
                    this.axios.post('/blog/decrypt',idAndPwd).then(res =>{
                        // console.log("执行解密接口")
                        if(res.data.data == null){
                            window.alert("密码输入错误")
                            this.$router.go(-1)
                        }else{
                            this.articledetail =res.data.data
                        }
                    // 前端逻辑还有大问题
                    }).catch(function(err){
                        console.log(err)
                    })

                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                    });       
                });
            }else{
                this.axios({
                    url:'/blog/'+this.$route.params.id,
                    method: 'get',
                    data: {},
                    headers:{ token:'',client:'' }
                }).then(res =>{
                        this.articledetail = res.data.data   
                },function(error){
                        console.log(error.res)
                })
            }
        }).catch(function(err){
            console.log(err)
        })



        },
    beforeUpdate () {
        document.querySelector('body').setAttribute('style', 'background-color:rgb(219, 212, 202)')
    },
    beforeDestroy () {
        document.querySelector('body').removeAttribute('style')
    }
}

</script>

<style scoped>
    #content{
        position: relative;
        margin-left: 20%;
        top: 0;
        width: 60%;
        font-size: 15px;
    }
    #SOHUCS{
        width: 80% !important;
    }
</style>