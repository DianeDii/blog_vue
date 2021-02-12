<template>
  <div id="blog">
      <div id="background"></div>
      <div id="content">
          <h1>技术博客:</h1>
          
         <div v-for="(item,index) in bloglist"  @click="getArticleId(item.id)">
              <span id="bogtime">{{moment(item.modifiedBy).format("YYYY-MM-DD")}}</span>
              <br>
              <router-link :to="'/blog/'+ item.id">
                <a href="#">
                    <span id="blogtitle">{{item.title}}</span> 
                </a>
              </router-link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>> 
              <span id="blogsummary">{{item.summary}}</span>
              <hr>
          </div>

      </div>
  </div>
</template>

<script>
import moment from 'moment'; 
export default {
    data(){
        return{
            bloglist: null,
            moment,
        }
    },

    created(){
        this.axios.get('/blog/listBlog').then(res =>{
            this.bloglist = eval(res.data.data)
            console.log(this.bloglist)
        }).catch(function(err){
            console.log(err)
        })
    }
    
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
</style>
