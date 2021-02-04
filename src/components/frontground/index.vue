<template>
  <div id="index" >
      <div id="recentBlog">
        <h3>最近文章</h3>
        <ul id="list">
            <!-- <router-link :to="'/blog/'+artid"> -->
            <li v-for="item in articleData" @click="getArticleId(item.id)" style="width:700px">
                <!-- @click="getArticleId(item.id)" -->
            {{moment(item.modifiedBy).format("YYYY-MM-DD")}} » 
                <a href="#"><span id="content">{{item.title}} ：{{item.summary}}</span></a>
            </li>
            <!-- </router-link> -->
        </ul>
    <!-- <button @click="out">调试</button> -->
      </div>
      <!--加搜索框 -->
      <div id="search">
          <div style="margin-top: 15px;">
                <el-input placeholder="请输入内容" v-model="searchdata" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchBlog"></el-button>
                </el-input>
                </div>
      </div>

  </div>
</template>

<script>
import moment from 'moment'; 
export default {

    data() {
        return {
            artid: 0,
            articleData: [],
            moment,
            searchdata: ''
        }
    },
    created(){
        this.axios.post("/blog/recent").then
            ((response) => {
                this.articleData = eval(response.data.data)
                console.log(this.articleData)
                },function(err){
                    console.log(err.response)
                    }
                )
    },
   methods:{
    //    out(){
    //    },
//  表示data(){return(xxx：0)}的值:this.$data.xxx
        getArticleId:function(articleid){
            // this.$data.artid = articleid
            this.$router.push({
                path:'/blog/'+articleid,
            })
        }, 
        searchBlog(){
            if(this.searchdata == ''){

            }else{
                this.axios.post('/blog/search?keyword='+this.searchdata).then(res=>{
                    if(res.data.data == "无数据"){
                        this.$router.push({
                          path:'/searchlist',
                            query:{
                                result: true
                            }
                        })
                    }else{
                        this.$router.push({
                          path:'/searchlist',
                            query:{
                                list:eval(res.data.data),
                                result: false
                            }
                        })
                    }
                })
            }
        }
   }
    
}

</script>

<style>
    #index{
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
    #recentBlog{
        position: relative;
        float: left;
        width: 40%;
    }
    #search{
        position: relative;
        float: right;
        width: 20%;
    }
    a:link{
        color: #567;
    }
</style>