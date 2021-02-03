<template>
  <div id="labor">
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
  margin-left: 10%;
  border:5px solid red;
  width: 500px;

}
</style>