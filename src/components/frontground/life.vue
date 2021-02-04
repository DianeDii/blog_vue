<template>
  <div id="life">
    <h3>随笔</h3>
    <ul id="list">
        <router-link :to="'/blog/'+artid">
        <li v-for='(item,index) in articleData' @click="getArticleId(item)" >
            {{moment(item.modifiedBy).format("YYYY-MM-DD")}} » 
                <a href="#"><span>{{item.title}} : {{item.summary}}</span></a>
        </li>
        </router-link>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'; 
export default {
 
    data() {
        return {
            artid: 0,
            articleData: null,
            moment,
        }
    },
    created(){
      this.axios({
        url:'/blog/listbysort/1',
        method: 'GET',
        data: {},
        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8' }
        }).then(res =>{
            this.articleData = eval(res.data.data)
            console.log(res.data.data) 
        },function(error){
            console.log(error.res)
            }) 
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
    #life{
        position: fixed;
        width: 100%;
        height: 80%;
    }
    h3{
        margin-right: 80%;
        height: 50px;
    }
    #list{
        width: 50%;
    }
    li{
        position: static;
        margin-left: 40%;
        height: 30px;
        text-align: left;
    }
    a:link{
        color: #567;
    }
</style>