<template>
  <div id="datalist">
  <el-table
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
        <el-input
          v-model="search"
          size="mini"
          style="width: 30%"
          placeholder="输入关键字搜索"/>
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
  export default {
    methods: {
      handleEdit(index, row) {
        if(this.nav === 1){
          this.$router.push({
          path:'/editblog',
          query:{
            isnew: false,
            id: row.id
          }
        })
        console.log(index, row.id,row.title);
        }else{
          // 出一个弹框：https://element.eleme.cn/#/zh-CN/component/message-box
          // 获取改完后的数据再axios传后面
          // 刷新组件
          // 同理还有删除
        }

      },
      handleDelete(index, row) {
        if(this.nav === 1){
        let params= new URLSearchParams()
        params.append('artID',row.id)

         this.axios({
              url:'/blog/del',
              method: 'delete',
              data: params,
              headers:{ token:'',client:'' }
              }).then(res =>{
                console.log("删除成功")
                window.location.reload()           
              },function(error){
                  console.log(error.res)
              }) 
        console.log(index, row);
        }else{
          // 删除sort
          this.axios.delete('/')
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
      reloadAll() {
        this.isRouterAlive = false
        this.$nextTick(() => {
        this.isRouterAlive = true
        
        })
      },
      getjsonlen(json){
      var jslength=0;
      for(var js2 in json){
           jslength++;
          }  
      return jslength
      },
      newblog(){
        this.$router.push({
          path:'/editblog',
          query:{
            isnew: true
          }
        })
      },

    },
    data() {
      return {
        // search: String,
        nav: 1,
        isRouterAlive: true,
        tableData: [],
        search: ''
      }
    },
    watch:{
      listennavid:{
        immediate: true,
        handler: function (newval) {
          this.nav = newval
          this.reloadAll()
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
                
                // console.info("111"+this.tableData)
              },function(error){
                  console.log(error.res)
              }) 
          }else if(this.nav === 2){
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
      }else{
        console.log("获取navid错误")
      }
     }
   }  
    },
    computed:{
      listennavid(){
          return this.$store.state.navid
      }
    }
  }
</script>
<style>
#newbtn{
  position: relative;
  margin: 5%;
}
</style>