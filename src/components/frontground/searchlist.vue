<template>
  <div id="searchList">
      <span>全局查询结果:</span><br>
      <span v-if="result">没有搜索到哦</span>
      <div id="content" v-if="!result" v-for="(item,index) in result" @click="getblogid(item.id)">
          <a href="#"><span>「{{item.title}}」 : {{item.summary}}</span></a>
      </div>
       <!-- <button @click="out">111</button> -->
  </div>
</template>

<script>
export default {
    data(){
        return{
            result: this.$route.query.result,
        }
    },
    methods:{
        // out(){
        //     console.log(this.result);
        // },
        getblogid(blogid){
            this.$router.push({
            path:'/blog/'+blogid,
        })
    }, 
    },

}
</script>

<style>
    #searchList{
        position: relative;
        float: left;
        width: 30%;
        text-align: left;
        margin-left: 10%;
    }
    #content{
        height: 50px !important;  
    }
</style>