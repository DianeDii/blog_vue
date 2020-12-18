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


Vue.use(Router)

export default new Router({
  routes: [
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
      component: backindex
    },
  ]
})
