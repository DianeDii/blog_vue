<template>
  <div id="home">
    <div class="background" @dblclick="open()"></div>
    <div id="content">
        <div id="avatar">
            <el-avatar :size="100" shape="square" src="https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/image-20210221194101786.png"></el-avatar>
        </div>
        <div id="tit">
            <div  v-for="(item,index) in partData" @click="tothere(index)"><a href="">{{item}}</a></div>
        </div>
    </div>
    <div id="footer">京ICP备2021004507号</div>
  </div>
</template>

<script>
export default {
  name:'home',  
  data(){
    return{
      partData:['blog','life','labor','about'],
    }
  },
  methods: {
    tothere(index){
      // console.log(typeof(index))
      if (index == 0) {
        this.$router.push({
          path:'/blog',
        })
      } else if(index == 1){
        this.$router.push({
          path:'/life',
        })
      } else if(index == 2){
        this.$router.push({
          path:'/labor',
        })
      }else{
        this.$router.push({
          path:'/about',
        }) 
      }
    },

      open() {
        this.$prompt('请输入关键字', '全局搜索', {
          confirmButtonText: '搜索',
          cancelButtonText: '取消',
         
        }).then(({ value }) => {
          // this.$message({
          //   type: 'success',
          //   message: '你的邮箱是: ' + value
          // });
          this.$router.push({
            path:'/search',
            query:{
              val: value,
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }


  }
}
</script>

<style scoped>
 #content{
    position: fixed;
    width: 240px;
    height: 160px;
    margin:auto;
    left:0;
    right:0;
    top:0;
    bottom:0;
  }
  #avatar{
    position: fixed;
    margin: auto;
    width: 100px;
    height: 100px;
    left:0;
    right:0;
  }
  #tit{
    position: fixed;
    width: 240px;
    height: 40px;
    margin-top: 120px;
  }
  #tit > div{
    position: float;
    float: left;
    /*flex 布局*/
    display: flex;
    width: 60px;
    height: 40px;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    text-align: justify;
    font-weight:bold;
    font-size: 16px;
  }
   .background{
      position:absolute;
      left:0;
      top:0;
      width: 100%;
      height: 100%;
      background-image: url("https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/v2-8686bd00b995318fa66e8690b9e2dd95_r.jpg");
  }
  #footer{
    position: fixed;
    width: 150px;
    height: 50px;
    margin:auto;
    left:0;
    right:0;
    bottom:0;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: justify;
    font-size: 14px;
  }
</style>

