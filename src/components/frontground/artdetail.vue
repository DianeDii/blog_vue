<template>
  <div id="detail">
      <router-view>
      </router-view> 
      <h2 v-if="articledetail != null">{{articledetail[0]}}</h2>
      <p v-if="articledetail != null">{{articledetail[1]}}</p>
      <br>
      <span v-if="articledetail != null">{{articledetail[2]}}</span>
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

<style>
    #detail > h2{
        text-align: center;
    }
    #detail > p{
        margin: 0;
        padding: 0;
        list-style-type: none;
        text-align: left;
        text-decoration: none;
        border-bottom: none;
        font-weight: normal;
        font-style: normal;
        border: none;
        color: #111;
        font-size: 1.6em;
        line-height: 150%;   
    }
    #detail{
        margin-left: 20%;
        width: 50%;
    }
</style>