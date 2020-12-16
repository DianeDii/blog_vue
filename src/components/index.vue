<template>
  <div id="index" >
    <h3>最近文章</h3>
    <ul id="list">
        <router-link :to="'/blog/'+artid">
        <li v-for='(item,index) in articleData' @click="getArticleId(item)" >
                {{index}}
        </li>
        </router-link>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
 
    data() {
        return {
            artid: 0,
            articleData: null,
        }
    },
    created(){
        axios.get("http://localhost:8081/blog/list").then
            ((response) => {
                this.articleData = response.data.data
                console.log(this.articleData)
                },function(err){
                    console.log(err.response)
                    }
                )
    },
   methods:{
//  表示data(){return(xxx：0)}的值:this.$data.xxx
        getArticleId:function(articleid){
            this.$data.artid = articleid
            console.log(this.artid)
        } 
   }
    
}

</script>

<style>
    h3{
        height: 50px;
        margin-right: 80%;
    }
    #list{
        width: 300px;
    }
    li{
        position: relative;
        float: left;
        margin-left: 40px;
        height: 50px;
    }
</style>