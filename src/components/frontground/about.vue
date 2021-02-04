<template>
  <div id="about">
      <div id="info">
        <!-- 图标待补充 -->
        <el-avatar id="me" shape="square" :size="75" :src="squareUrl"></el-avatar>
        <a href="https://www.github.com/DianeDii"><el-avatar shape="square" :size="30" :src="github"></el-avatar></a>
        <a href="https://www.douban.com/people/166080975"><el-avatar shape="square" :size="30" :src="douban"></el-avatar></a>
        <a href="https://twitter.com/dianediiiii"><el-avatar shape="square" :size="30" :src="twitter"></el-avatar></a>
        <a href="https://www.instagram.com/dianediiiii/"><el-avatar shape="square" :size="30" :src="ins"></el-avatar></a>
        <p v-html="introduce"></p>
      </div>
      <div id="tel">
        
      </div>
      
  </div>
</template>

<script>
export default {
    data () {
      return {
        introduce: String,
        squareUrl: "http://dianedii-iamge.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210122170543.jpg?OSSAccessKeyId=LTAI4G5iZBoNMGL35GkRdqn5&Expires=5211306378&Signature=GMI7xY7PJSeHsy7NCiKUAxOawgs%3D",
        github:"http://dianedii-iamge.oss-cn-beijing.aliyuncs.com/GitHub-Mark.png?OSSAccessKeyId=LTAI4G5iZBoNMGL35GkRdqn5&Expires=1710952194&Signature=y9iV1f9a3SkNYYOhJjlP8miqbAs%3D",
        douban:"http://dianedii-iamge.oss-cn-beijing.aliyuncs.com/%E8%B1%86%E7%93%A3.png?OSSAccessKeyId=LTAI4G5iZBoNMGL35GkRdqn5&Expires=5210952837&Signature=sFiXrCmlXlxKaZRHC9CeJxNCpDw%3D",
        twitter:"http://dianedii-iamge.oss-cn-beijing.aliyuncs.com/twitter.jpg?OSSAccessKeyId=LTAI4G5iZBoNMGL35GkRdqn5&Expires=5210952267&Signature=O2eX5y1iDtaGtzmxRWjQuQmRGmU%3D",
        ins:"http://dianedii-iamge.oss-cn-beijing.aliyuncs.com/ins.png?OSSAccessKeyId=LTAI4G5iZBoNMGL35GkRdqn5&Expires=5210952665&Signature=qOc%2BHipQr1v2I3juIByDuTK9P5Q%3D"
        }
    },
    created(){
      this.axios.get('/blog/102').then(res =>{
        this.introduce = res.data.data[1];
      }).catch(function(err){
        console.log(err)
      })
    },
}
</script>

<style>
#about{
  position: fixed;
  width: 100%;
  height: 80%;
}
#info{
  position: relative;
  height: 200px;
}
#me{
  margin-top: 5%;
  margin-right: 5%;
}
</style>