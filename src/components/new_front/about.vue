<template>
  <div id="about">
      <div id="background"></div>
      <div :class="IsPC() ? 'content_pc':'content_mob'">
        <!-- 图标待补充 -->
        <div :class="IsPC() ? 'info_pc':'info_mob'">
            <el-avatar id="me" shape="square" :size="75" :src="squareUrl"></el-avatar>
            <div :class="IsPC() ? 'contact_pc':'contact_mob'">
                <a href="https://www.github.com/DianeDii"><el-avatar shape="square" :size="30" :src="github"></el-avatar></a>
                <a href="https://www.douban.com/people/166080975"><el-avatar shape="square" :size="30" :src="douban"></el-avatar></a>
                <a href="https://twitter.com/dianediiiii"><el-avatar shape="square" :size="30" :src="twitter"></el-avatar></a>
                <a href="https://www.instagram.com/dianediiiii/"><el-avatar shape="square" :size="30" :src="ins"></el-avatar></a>
            </div>
        </div>
        <div :class="IsPC() ? 'intro_pc':'intro_mob' ">
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
        squareUrl: "https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/image-20210221194101786.png",
        github:"https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/GitHub-Mark.png",        
        douban:"https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/%E8%B1%86%E7%93%A3.png",
        twitter:"https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/twitter.jpg",
        ins:"https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/ins.png",
        }
    },
    created(){
      this.axios.get('/blog/102').then(res =>{
        this.introduce = res.data.data[1];
      }).catch(function(err){
        console.log(err)
      })
    },
    inject: ['IsPC'],

}
</script>
<style scoped>
/* 全局样式 */
    #background{
        position:absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background-color: rgb(219, 212, 202);
  }
</style>

<style scoped>
/* PC端样式 */
    .content_pc{
        position: fixed;
        top: 0;
        width: 900px;
        height: 100%;
        margin-left: 20%;
    }
    .info_pc{
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
    .content_pc > div{
        margin-top: 30px;

    }
    .content_pc > div > span{
        margin-left: 40px;
    }
    .contact_pc{
      margin-left: 50px;
  }
    .intro_pc{
        position: relative;
        float: left ;
        width: 900px;
        height: 100px;
    }
</style>

<style scoped>
/* 移动端样式 */
    .content_mob{
        position: fixed;
        top: 0;
        width: 900px;
        height: 100%;
        margin-left: 10%;
    }
    .info_mob{
        position: float;
        float: left;
        /*flex 布局*/
        display: flex;
        width: 600px;
        height: 200px;
        /*实现垂直居中*/
        align-items: center;
        /*实现水平居中*/
        /* justify-content: center; */

    
    }
    .content_mob > div{
        margin-top: 30px;

    }
    .content_mob > div > span{
        margin-left: 40px;
    }
    .contact_mob{
      margin-left: 50px;
  }
    .intro_mob{
        position: relative;
        float: left ;
        width: 900px;
        height: 100px;
        margin-left: 5%;
    }
</style>