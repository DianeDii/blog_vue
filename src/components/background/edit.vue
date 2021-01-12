<template>
  <div id="editblog">
      <div id="title">
          <span>标题: 
<el-input style="width:20%" v-model="inputtitle" placeholder="请输入内容"></el-input></span>
        <span>简介: 
<el-input style="width:30%" v-model="inputsummary" placeholder="请输入内容"></el-input></span>
      </div>
      <div id="editor" style="text-align: left; width:60%">
          <!-- {{articledetail[1]}} -->
      </div>
      <div id="sort">
          <el-button id="btn" type="primary" @click="submit">提交</el-button>
          <el-button type="primary" @click="reset">放弃</el-button>
          <!-- <el-button type="primary" @click="out">自定义调试</el-button> -->
          <span id="switch">生活随笔:</span>
          <el-switch
            v-model="islife"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
          
      </div>
      <div id="select" v-if="!islife">
          <span>详细分类：</span>
            <el-select v-model="sortchoose" placeholder="请选择">
                <el-option
                v-for="item in sortlist"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
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
            inputsummary: null,
            edit: null,//临时存editor
            buildarticle:{
                artid: Number,
                title: String,
                summary: String,
                content: String
            },//构造文章返回数据
            islife: false,
            sortlist: [],
            sortchoose: '',
            isnewArtid: Number,
            sortdata: null //文章分类提交数据
        }
    },
    methods:{
        // out(){},
        async submit(){
            if (this.islife === false && this.sortchoose == '') {
                window.alert("你还未选择分类！");
            } else {
            this.buildarticle.title = this.inputtitle
            this.buildarticle.summary = this.inputsummary
            // 思路就是：先在create()初始化当前有的分类。并展示，然后再submit()中用axios来进行已选分类的保存，然后后端接口可能有问题的话就是调bug了
            // 2021-1-5:已选分类的文章，在编辑时应该带上之前选的分类情况，
            // 还有就是未选择分类（非随笔且未选择其他分类的不允许被提交）ok
            // 这块整完了看一下文章怎么支持带格式的存数据库

            // Q:多个axios执行顺序问题

            

            if(this.isnew === "true"){
                this.buildarticle.content = this.edit.txt.html()
                // 新建文章
                await this.axios({
                    url:'/blog/init',
                    method: 'post',
                    data: this.buildarticle,
                    headers:{ token:'',client:'' }
                    }).then(res =>{
                        console.log("提交文章信息")
                        this.isnewArtid =res.data.data;
                    // 构造分类提交数据
                    if(this.islife === true){
                          this.sortdata ={"sortId":1,"articleId":this.isnewArtid}
                    }else{
                          this.sortdata ={"sortId": this.sortchoose,"articleId":this.isnewArtid}
                     }
                    },function(error){
                        console.log(error.res)
                    })
     
                    //  提交分类信息
                    await this.axios({
                    url:'/sort/add',
                    method: 'post',
                    data: this.sortdata,
                    headers:{ token:'',client:'' }
                    }).then(res =>{
                        console.log("为文章加分类成功")
                        this.$router.push("/backindex")
                    },function(error){
                        console.log(error.res)
                    })   
            }else{
                // 更新文章
                this.buildarticle.content = this.edit.txt.html()
                this.buildarticle.artid = this.$route.query.id
                this.axios({
                    url:'/blog/update',
                    method: 'post',
                    data: this.buildarticle,
                    headers:{ token:'',client:'' }
                    }).then(res =>{
                        console.log("更新成功")
                    },function(error){
                        console.log(error.res)
                    })
                    
                     if(this.islife === true){
                         this.sortdata ={"sortId":1,"articleId":this.$route.query.id}
                     }else{
                         this.sortdata ={"sortId": this.sortchoose,"articleId":this.$route.query.id}
                }
                      this.axios({
                        url:'/sort/add',
                        method: 'post',
                        data: this.sortdata,
                        headers:{ token:'',client:'' }
                    }).then(res =>{
                        console.log("为文章加分类成功")
                        this.$router.push("/backindex")
                    },function(error){
                        console.log(error.res)
                    })
            }  
            }
 
        
        },
   
        reset(){
            console.log("exit")
            this.$router.push("/backindex")
        },

    },
    created () {
      this.axios.get('/sort/list').then(response=> {
          this.sortlist = response.data.data;
          this.sortlist.shift();//删除随笔的分类
        //   console.log(this.sortlist.data)
        }).catch(function (error) {
            console.log(error);
        });
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
                    console.log(res.data.data)
                    this.inputtitle = res.data.data[0]                    
                    editor.txt.append(res.data.data[1])
                    this.inputsummary = res.data.data[3]
                 },function(error){
                    console.log(error.res)
                })
                
            // 在这加载已定义分类信息
            this.axios.get('/sort/'+this.$route.query.id).then(res=>{
                // console.log(res.data.data)
                if(res.data.data == 1){
                    this.islife =true
                }else{
                    this.sortchoose =res.data.data
                }
            }).catch(function(err){
                console.log(err)
            })
        }
    }

}
</script>

<style>
#editor{
    margin-left: 20%;
}
#sort{
    position: relative;
    margin-left: 20%;
    float: left;
    height: 100px;
}
  .el-select-dropdown {
     top: 680px !important;
  }
#switch{
    margin-left: 100px;
}

/* wangEditor样式 */
/* table 样式 */
table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}

/* ul ol 样式 */
ul, ol {
  margin: 10px 0 10px 20px;
}
</style>