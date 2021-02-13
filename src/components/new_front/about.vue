<template>
  <div id="about">
      <div id="background"></div>
      <div id="content">
        <!-- 图标待补充 -->
        <div id="info">
            <el-avatar id="me" shape="square" :size="75" :src="squareUrl"></el-avatar>
            <div id="contact">
                <a href="https://www.github.com/DianeDii"><el-avatar shape="square" :size="30" :src="github"></el-avatar></a>
                <a href="https://www.douban.com/people/166080975"><el-avatar shape="square" :size="30" :src="douban"></el-avatar></a>
                <a href="https://twitter.com/dianediiiii"><el-avatar shape="square" :size="30" :src="twitter"></el-avatar></a>
                <a href="https://www.instagram.com/dianediiiii/"><el-avatar shape="square" :size="30" :src="ins"></el-avatar></a>
            </div>
        </div>
        <div id="intro">
            <p v-html="introduce"></p>
        </div>
      </div>      
  </div>
</template>

<script>
export default {
    data () {
      return {
        introduce: String,
        squareUrl: "https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210122170543.jpg",
        github:"https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/GitHub-Mark.png",        
        douban:"https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/%E8%B1%86%E7%93%A3.png",
        twitter:"https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/twitter.jpg",
        ins:"https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/ins.png"
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

<style scoped>
    #content{
        position: fixed;
        top: 0;
        width: 900px;
        height: 100%;
        margin-left: 20%;
    }
    #info{
        position: float;
        float: left;
        /*flex 布局*/
        display: flex;
        width: 600px;
        height: 200px;
        /*实现垂直居中*/
        align-items: center;
        /*实现水平居中*/
        justify-content: center;

    
    }
    #content > div{
        margin-top: 30px;

    }
    #blogtitle{
        font-size: 20px;
    }
    #blogsummary{
        font-size: 15px;
    }
    #content > div > span{
        margin-left: 40px;
    }
    #background{
        position:absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background-color: rgb(219, 212, 202);
  }
     #contact{
      margin-left: 50px;
  }
    #intro{
        position: relative;
        float: left ;
        width: 900px;
        height: 100px;
    }
</style>