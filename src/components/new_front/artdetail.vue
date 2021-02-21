<template>
  <div id="detail">
      <div id="background"></div>
      <div id="content">
        <router-view></router-view> 
        <h2 v-if="articledetail != null" v-html="articledetail[0]"></h2><br>
        <p v-if="articledetail != null" v-html="articledetail[1]"></p>
        <br>
        <span v-if="articledetail != null">{{articledetail[2]}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh">版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）</a></span>
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
methods:{

},
mounted(){

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
        position: relative;
        margin-left: 20%;
        top: 0;
        width: 60%;
        /* height: 100%; */
        font-size: 15px;

    }
    /* #background{
        position:absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background-color: blanchedalmond;
    } */
</style>