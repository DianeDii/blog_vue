<template>
  <div id="labor">
    <h3>我的实验室，实现一些花里胡哨的想法。</h3>
      <div id="content" v-for="(item,index) in projectdata">
          <a href="#"><span>「{{item.title}}」 : {{item.summary}}</span></a>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      projectdata: [],
    }
  },
  created(){
    this.axios.get('/blog/listbysort/2').then(res =>{
      this.projectdata = eval(res.data.data)
      console.log(this.projectdata)
    }).catch(function(err){
      console.log(err)
    })
  }
}
</script>

<style>
#content{
 position: relative;
 width: 500px;
 height: 309px;
 border:1px solid #96c2f1;
 background:#eff7ff;
 margin: 10px,20px,10px,20px;  /*上右下左 */
}
</style>