<template>
  <div id="blog">
    <h3>技术文章</h3>
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
export default {
 
    data() {
        return {
            artid: 0,
            articleData: null,
        }
    },
    created(){
        this.axios.get("/blog/listBlog").then
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
        position: static;
        margin-left: 40%;
        height: 30px;
        text-align: left;;
    }
</style>