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
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="primary" @click="reset">放弃</el-button>
      </div>
      
                  
  </div>
</template>

<script>
// 这里isnew === true 判断有问题

import E from "wangeditor";

export default {
    name: "Editor",
    data(){
        return{
            isnew: this.$route.query.isnew,
            articledetail: [],
            inputtitle: null,
            edit: null,//临时存editor
            buildarticle:{
                artid: Number,
                title: String,
                summary: String,
                content: String
            }//构造文章返回数据
        }
    },
    methods:{
        submit(){
            this.buildarticle.title = this.inputtitle
            this.buildarticle.summary = "无"
            
            
            console.log(this.buildarticle)
            if(this.isnew === "true"){
                this.buildarticle.content = this.edit.txt.text()
                // 新建文章
                this.axios({
                    url:'/blog/init',
                    method: 'post',
                    data: this.buildarticle,
                    headers:{ token:'',client:'' }
                    }).then(res =>{
                        this.$router.push("/backindex")
                    },function(error){
                        console.log(error.res)
                    }) 
            }else{
                // 更新文章
                this.buildarticle.content = this.edit.txt.text()
                this.buildarticle.artid = this.$route.query.id
                this.axios({
                    url:'/blog/update',
                    method: 'post',
                    data: this.buildarticle,
                    headers:{ token:'',client:'' }
                    }).then(res =>{
                        console.log("更新成功")
                        this.$router.push("/backindex")
                    },function(error){
                        console.log(error.res)
                    })  
            }
        },
        reset(){
            console.log("exit")
            this.$router.push("/backindex")
        },

    },
    created () {
      
    },
    mounted(){
        const editor = new E('#editor')
        // 在这new的editor在别的方法里获取不到，我就把它先存到data里，其他方法中调用data中的edit就可以了
        this.edit = editor
        editor.create()
        // if 点新建进来的，内容就置为空， else 获取当前点击文章id，初始化文章内容
        if (this.isnew === "true") {
            this.articledetail.artid = null
            this.articledetail.title = null
            this.articledetail.summary = null
            this.articledetail.content = null
        }else{
            this.axios({
                url:'/blog/'+this.$route.query.id,
                method: 'get',
                data: {},
                headers:{ token:'',client:'' }
                }).then(res =>{
                    
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