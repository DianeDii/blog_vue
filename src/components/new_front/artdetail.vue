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
      <div id="SOHUCS"></div> 
  </div>
 
</template>

<script>
import comments from '../../utils/comments'
export default {
    data(){
        return{
            articledetail: null,
        }
    },
    mounted(){
        comments.addcomment();
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
    beforeUpdate () {
        document.querySelector('body').setAttribute('style', 'background-color:rgb(219, 212, 202)')
    },
    beforeDestroy () {
        document.querySelector('body').removeAttribute('style')
    }
}

</script>

<style scoped>
    #content{
        position: relative;
        margin-left: 20%;
        top: 0;
        width: 60%;
        font-size: 15px;
    }
    #SOHUCS{
        width: 80% !important;
    }
</style>