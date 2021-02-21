<template>
  <div id="datalist">
  <el-table v-if="nav != 4"
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-button type="primary" id="newbtn" @click="newblog">新建</el-button>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <div id="info" v-if="nav ==4">
      <div id="editor" style="text-align: left; width:60%"></div>
      <el-button id="btn" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
import E from "wangeditor";
  export default {
    name: "Editor",
    methods: {
      handleEdit(index, row) {
        if(this.nav === 1){
          this.$router.push({
          path:'/editblog',
          query:{
            isnew: false,
            id: row.id,
            isproject: false
          }
        })
        // console.log(index, row.id,row.title);
        }else if(this.nav ===2){
          // 出一个弹框：https://element.eleme.cn/#/zh-CN/component/message-box
          // 获取改完后的数据再axios传后面
          // 刷新组件
          // 同理还有删除
          this.$prompt('请输入新的分类名称','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) =>{
              var params ={"sortid":row.id,"value":value}
            this.axios.post('/sort/update',params).then(res =>{
              this.$message({
                type: 'success',
                message: '分类信息修改成功'
              })
              this.reloadAll()
            }).catch(function(err){
              console.log(err)
            })
          })
        }else if(this.nav ===3){
          // 新建一个edit页面或者改造editblog页面，改造吧，传的时候加一个新参数判断是labor进来的
          this.$router.push({
            path:'/editblog',
            query:{
              isnew: false,
              id: row.id,
              isproject: true
            }
          })
        }else{
          console.log("nav不存在")
        }
      },

      handleDelete(index, row) {
        if(this.nav === 1 || this.nav === 3){
        let params= new URLSearchParams()
        params.append('artID',row.id)

         this.axios({
              url:'/blog/del',
              method: 'delete',
              data: params,
              headers:{ token:'',client:'' }
              }).then(res =>{
                console.log("删除成功")
                this.reloadAll();     
              },function(error){
                  console.log(error.res)
              }) 
        console.log(index, row);
        }else if(this.nav ===2){
          // 删除sort
          // 之前简写axios一直报错sortId is not present ,原因应该是没有设headers
          var params= new URLSearchParams()
          params.append('sortId',row.id)
          this.axios({
              url:'/sort/del',
              method: 'delete',
              data: params,
              headers:{ token:'',client:'' }
              }).then(res =>{
                this.reloadAll()
                console.log("删除分类成功！")
              }).catch(function(err){
                console.log(err)
              })
        }else{
          console("nav选到别的了"+this.nav)
        }
      },

      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 2) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      // reloadAll() {
      //   var tmp = this.nav;
      //   window.location.reload();
      //   this.$store.commit('getnavdata',tmp)
      //   // this.nav = tmp;
      //   console.log("roadAll方法执行了,当前的nav="+ this.nav)
      //   this.reload()
      // },
      getjsonlen(json){
      var jslength=0;
      for(var js2 in json){
           jslength++;
          }  
      return jslength
      },
      newblog(){
        if(this.nav === 1){
        this.$router.push({
          path:'/editblog',
          query:{
            isnew: true,
            isproject: false
          }
        })
        console.log(this.nav)
        }else if(this.nav ===2){
          this.$prompt('请输入新的分类名称','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) =>{
                let params= new URLSearchParams()
                params.append('sortName',value)
            this.axios.post('/sort/create',params).then(res =>{
              this.$message({
                type: 'success',
                message: '创建分类成功'
              })
              this.reloadAll()
            }).catch(function(err){
              console.log(err)
            })
          })
        }else if(this.nav ===3){
          this.$router.push({
            path:'/editblog',
            query:{
              isnew: true,
              isproject: true
            }
          })
          console.log(this.nav)
        }
      },
      submit(){
        // 这里只用content，其他的随笔填
        this.buildarticle.content = this.edit.txt.html()
        this.buildarticle.artid = 102
        this.buildarticle.title = "me"
        this.buildarticle.summary = "me"
        this.axios.post('/blog/update',this.buildarticle).then(res =>{
          this.reloadAll()
          console.log("更新成功！")
        }).catch(function(err){
          console.log(err)
        })
      },

    },
    inject: ['reloadAll'],
    data() {
      return {
        // search: String,
        nav: 1,
        isRouterAlive: true,
        tableData: [],
        search: '',
        edit:null,
        buildarticle:{
          artid: Number,
          title: String,
          summary: String,
          content: String
        }
        
      }
    },
// 监听tree，根据不同节点初始化不同datalist
    watch:{
      listennavid:{
        immediate: true,
        handler: function (newval) {
          this.nav = newval
          // this.reloadAll()
          this.tableData = []
          // window.location.reload()
          if (this.nav === 1) {
        // 初始化文章list
            this.axios({
              url:'/blog/list',
              method: 'get',
              data: {},
              headers:{ token:'',client:'' }
              }).then(res =>{
                
                // for(var i in res.data.data){
                //   var row ={}
                //   row.id = res.data.data[i]
                //   row.title = i
                  this.tableData = eval(res.data.data)
                // }
                
                // console.info(this.tableData)
              },function(error){
                  console.log(error.res)
              }) 
          }else if(this.nav === 2){
            this.tableData = []
        // 初始化分类list
            this.axios({
              url:'/sort/list',
              method: 'get',
              data: {},
              headers:{ token:'',client:'' }
              }).then(res =>{
                
                for(var i in res.data.data){
                  var row ={}
                  row.id = res.data.data[i].id
                  row.title = res.data.data[i].name
                  this.tableData.push(row)
                }
                
                // console.info("111"+this.tableData)
              },function(error){
                  console.log(error.res)
              }) 
      }else if(this.nav === 3){
        // /sort/2
        this.tableData =[];
          this.axios.get('/blog/listbysort/2').then(res =>{
            // console.log(res.data.data)
            // 几个nav直接来回点，之前的nav内容应该清理，不清理就会有问题
              this.tableData = eval(res.data.data)
          }).catch(function(err){
            console.log(err)
          })
      }else if(this.nav ===4){

      // /sort/3  内只有一篇文章，直接获取文章
         this.axios.get('/blog/102').then(res =>{
          const editor = new E('#editor')
          this.edit = editor
          editor.create()
           editor.txt.append(res.data.data[1])
            // this.tableData = eval(res.data.data)
         }).catch(function(err){
           console.log(err)
         })
      }else{
        console.log("获取navid错误")
      }
     }}},
    computed:{
      listennavid(){
          return this.$store.state.navid
      }
    }
  }
</script>
<style scoped>
#newbtn{
  position: relative;
  margin: 5%;
}
</style>