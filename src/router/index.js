import Vue from 'vue'
import Router from 'vue-router'
// import blog from '@/components/new_front/blog.vue'
// import life from '@/components/new_front/life.vue'
// import labor from '@/components/new_front/labor.vue'
import list from '@/components/new_front/list.vue'
import about from '@/components/new_front/about.vue'
import detail from '@/components/new_front/artdetail.vue'
import login from '@/components/frontground/login.vue'
import backindex from '@/components/background/b_index.vue'
import datalist from '@/components/background/datalist.vue'
import editblog from '@/components/background/edit.vue'
import cookie from '../utils/cookie'
import searchlist from '@/components/frontground/searchlist.vue'
import NotFound from '@/components/new_front/404.vue'



import home from '@/components/new_front/home.vue'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      redirect: '/home' 
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/blog',
      component: list
    },
    {
      path: '/life',
      component: list
    },
    {
      path: '/labor',
      component: list
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
    { 
      path: '/notfount', 
      name: NotFound,
      component: NotFound },
  ]
})

/*
* beforeEach:从一个页面跳转到另外一个页面时触发
* to:要跳转的页面
* from:从哪个页面出来
* next:决定是否通过
*/
router.beforeEach((to, from, next) => {
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