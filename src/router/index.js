import Vue from 'vue'
import Router from 'vue-router'
import blog from '@/components/frontground/blog.vue'
import life from '@/components/frontground/life.vue'
import labor from '@/components/frontground/labor.vue'
import about from '@/components/frontground/about.vue'
import index from '@/components/frontground/index.vue'
import detail from '@/components/frontground/artdetail.vue'
import login from '@/components/frontground/login.vue'
import backindex from '@/components/background/b_index.vue'
import datalist from '@/components/background/datalist.vue'
import editblog from '@/components/background/edit.vue'
import cookie from '../utils/cookie'
import searchlist from '@/components/frontground/searchlist.vue'

Vue.use(Router)

const router = new Router({
  
  routes: [
    { 
      path: '/', 
      redirect: '/index' 
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/life',
      name: 'life',
      component: life
    },
    {
      path: '/labor',
      name: 'labor',
      component: labor
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/blog/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/backindex',
      name: 'backindex',
      component: backindex,
      meta: {
        requestAuth: true  //请求认证，路由守卫
      }
    },
    {
      path: '/datalist',
      name: 'datalist',
      component: datalist,
      meta: {
        requestAuth: true
      }
    },
    {
      path: '/editblog',
      name: 'editblog',
      component: editblog,
      meta: {
        requestAuth: true 
      }
    },
    {
      path: '/searchlist',
      name: 'searchlist',
      component: searchlist
    },
  ]
})

/*
* beforeEach:从一个页面跳转到另外一个页面时触发
* to:要跳转的页面
* from:从哪个页面出来
* next:决定是否通过
*/
router.beforeEach((to, from, next) => {
  if(to.matched.some(res => res.meta.requestAuth)){
      if(cookie.getCookie("value")){
        next()
      }else{
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      }
  }else{
    next()
  }
  })
  export default router