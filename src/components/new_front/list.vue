<template>
  <div id="life">
      <div id="background"></div>
      <div :class="IsPC() ? 'content_pc':'content_mob'">
          <h1>{{toptitle}}</h1>
          <div v-for="(item,index) in list">
              <span>{{moment(item.modifiedBy).format("YYYY-MM-DD")}}</span>
              <span v-if="routeName == '/blog'">&emsp; &emsp; &emsp; #  {{item.ofsort}}</span>
              <br>
              <router-link :to="'/blog/'+ item.id">
                <a href="#"><!-- @click="checkIsSecret(item.id)" -->
                    <span id="blogtitle">{{item.title}}</span> 
                </a>
              </router-link>
              <div v-if="!IsPC()">
                  <br>
              </div>
              >> 
              <span :class="IsPC() ? 'blogsummary':'blogsummary_mob'">{{item.summary}}</span>
              <br><br>
              <hr :class="IsPC() ? 'hr_pc':'hr_mob'">
          </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'; 
import datalistVue from '../background/datalist.vue';
export default {
    data(){
        return{
            moment,
            routeName: this.$route.path,
            // 将/labor /life /blog三个组件合成一个组件
            toptitle: String,
            bloglist: [],
            list: [],
            keyword: this.$route.query.val,
        }
    },
    inject: ['IsPC'],
    created(){
        if(this.routeName == "/life"){
            this.toptitle ="生活随笔:",
            this.axios.get('/blog/listbysort/1').then(res =>{
                this.list = eval(res.data.data)
            }).catch(function(err){
                console.log(err)
            })
        }else if(this.routeName == "/blog"){
            this.toptitle ="技术博客:",
            this.axios.get('/blog/listBlog').then(res =>{
                this.list = this.getArtSortName(eval(res.data.data))
                // this.list = eval(res.data.data)
            }).catch(function(err){
                console.log(err)
            })
        }else if(this.routeName == "/labor"){
            this.toptitle ="我的实验室:",
            this.axios.get('/blog/listbysort/2').then(res =>{
                this.list = eval(res.data.data)
                }).catch(function(err){
                console.log(err)
                })
        }else if(this.routeName == "/search"){
            this.toptitle ="搜索结果:",
            this.axios.post('/blog/search?keyword='+this.keyword).then(res =>{
                console.log(this.keyword)
                this.list = eval(res.data.data)
                console.log(this.list)
                }).catch(function(err){
                console.log(err)
                })
        }else{
            this.$router.push("/notfount")
        }
    },        

    methods: {
         getArtSortName(data){
        // 获取到文章后，再获取文章的sort信息
                 data.forEach(element => {
                    this.axios.get("/sort/"+element.id).then(result =>{
                        element.ofsort = result.data.data
                        this.$set(element,result.data.data)
                    }).catch(function(err){
                        console.log(err)
                    })   
                });
                return data;
            },

            // checkIsSecret(data){
                // this.axios.get('/blog/isSecret?artID='+data).then(res =>{
                //     if(res.data.data = true){
                //         this.$prompt('该文章被加密', '请输入密码', {
                //         confirmButtonText: '确定',
                //         cancelButtonText: '取消',
                        
                //         }).then(({ value }) => {

                //         }).catch(() => {
                //         this.$message({
                //             type: 'info',
                //             message: '取消输入'
                //             });       
                //         });
                //     }
                // }).catch(function(err){
                //     console.log(err)
                // })
            // }
    },
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background-color:rgb(219, 212, 202)')
    },
    beforeDestroy () {
        document.querySelector('body').removeAttribute('style')
    }
    
}
</script>

<style scoped>
    .content_pc{
        position: relative;
        top: 0;
        width: 900px;
        height: 100%;
        margin-left: 20%;
    }
    .content_pc > div{
        margin-top: 30px;

    }
    #blogtitle{
        font-size: 20px;
    }
    #blogsummary{
        font-size: 15px;
    }
    .content_pc > div > span{
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

<style scoped>
/* 移动端 */
    .content_mob{
        position: relative;
        top: 0;
        width: 600px;
        height: 100%;
        /* margin-left: 10%; */
    }
    .content_mob > h1{
        margin-top: 30px;
        margin-left: 10%;

    }
    .hr_mob{
        margin-left: 10px;
        width: 300px;
    }
    .content_mob > div{
        margin-top: 30px;
        margin-left: 10%;

    }
    #blogtitle{
        font-size: 20px;
    }
    .blogsummary_mob{
        font-size: 15px;


    }
    .content_mob > div > span{
        margin-left: 10px;
    }
</style>
