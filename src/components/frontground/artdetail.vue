<template>
  <div id="detail">
      <router-view>
      </router-view>
      <h2>{{articledetail[0]}}</h2>
      <p>{{articledetail[1]}}</p>
      <br>
      <span>{{articledetail[2]}}</span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
data(){
    return{
        articledetail: null,
    }
},
created(){
    axios({
        url:'http://localhost:8081/blog/'+this.$route.params.id,
        method: 'get',
        data: {},
        headers:{ token:'',client:'' }
        }).then(res =>{
            this.articledetail = res.data.data
            console.log(res.data.data) 
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