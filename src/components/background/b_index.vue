<template>
  <div id="bindex">
      <tree></tree>
      <div id="mainarea">
          <datalist></datalist>
      </div>
  </div>
</template>

<script>
import Datalist from './datalist.vue'
import tree from './tree.vue'
export default {
  components: { tree, Datalist },
  methods:{
    gettreedata(payload){
      this.treedata =payload
      console.log(this.treedata)
    }
  },
  data(){
    return{
      treedata: Number
    }
  }
}
</script>

<style>
#mainarea{
        position: relative;
        float: left;
        width: 80%;
        margin-left: 0%;
        text-align: left;
}
</style>