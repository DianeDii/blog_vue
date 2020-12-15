<template>
  <div id="detail">
      <router-view>
        <h2></h2>
        <p></p>
      </router-view>
      <h2>{{artid}}</h2>
      <button @click="gettest">点击</button>
  </div>
</template>

<script>
export default {
data(){
    return{
        articledetail: null,

    }
},
 props: ['artid'],
 methods:{
        // 点击文章标题index组件获取到了文章的detail内容，需要把这些信息传给articledetail组件（应该可以构建一个父子组件吧）
        getArticleContent:function(id){
            axios({
                url:'http://localhost:8081/blog/'+id,
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
        
        gettest:function(){
            console.log(this.id)
        }
    }
}
</script>

<style>

</style>