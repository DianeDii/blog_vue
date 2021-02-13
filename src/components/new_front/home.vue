<template>
  <div id="home">
    <div class="background"></div>
    <div id="content">
        <div id="avatar">
            <el-avatar :size="100" shape="square" src="https://dianedii-weekly.oss-cn-beijing.aliyuncs.com/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210122170543.jpg"></el-avatar>
        </div>
        <div id="tit">
            <div  v-for="(item,index) in partData" @click="tothere(index)"><a href="#">{{item}}</a></div>
        </div>
    </div>
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
</style>

