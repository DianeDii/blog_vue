<template>
  <div id="detail">
      <div id="background"></div>
      <div id="content">
        <router-view></router-view> 
        <h2 v-if="articledetail != null" v-html="articledetail[0]"></h2><br>
        <p v-if="articledetail != null" v-html="articledetail[1]"></p>
        <br>
        <span v-if="articledetail != null">{{articledetail[2]}}</span>
      </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        articledetail: null,
    }
},
created(){
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
        font-size: 15px;
    }

</style>