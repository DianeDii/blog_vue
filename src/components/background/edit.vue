<template>
  <div id="editblog">
      <div id="title">
          <span>标题: 
<el-input style="width:20%" v-model="inputtitle" placeholder="请输入内容"></el-input></span>
      </div>
      <div id="editor" style="text-align: left; width:60%">
          <!-- {{articledetail[1]}} -->
      </div>
      <div id="btn">
          <el-button type="primary">提交</el-button>
          <el-button type="primary">放弃</el-button>
      </div>
      
                  
  </div>
</template>

<script>
import axios from 'axios';
import E from "wangeditor";

export default {
    name: "Editor",
    data(){
        return{
            isnew: this.$route.query.isnew,
            articledetail: [],
            inputtitle: null,
        }
    },
    methods:{

    },
    created () {
      
    },
    mounted(){
        var editor = new E('#editor')
        editor.create()
        // if 点新建进来的，内容就置为空， else 获取当前点击文章id，初始化文章内容
        if (this.isnew === true) {
            this.articledetail = null
        }else{
            axios({
                url:'http://localhost:8081/blog/'+this.$route.query.id,
                method: 'get',
                data: {},
                headers:{ token:'',client:'' }
                }).then(res =>{
                    var row = {}
                    this.inputtitle = res.data.data[0]                    
                    editor.txt.append(res.data.data[1])
                 },function(error){
                    console.log(error.res)
                }) 
        }
    }

}
</script>

<style>
#editor{
    margin-left: 20%;
}
</style>