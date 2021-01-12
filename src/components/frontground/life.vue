<template>
  <div id="life">
    <h3>随笔</h3><br>
    <ul id="list">
        <router-link :to="'/blog/'+artid">
        <li v-for='(item,index) in articleData' @click="getArticleId(item)" >
                <a href="#"><span>{{index}}</span></a>
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
      this.axios({
        url:'/blog/listbysort/1',
        method: 'GET',
        data: {},
        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8' }
        }).then(res =>{
            this.articleData = res.data.data
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
    a:link{
        color: #567;
    }
</style>