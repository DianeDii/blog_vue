import Vue from 'vue'
import Router from 'vue-router'
import blog from '@/components/blog.vue'
import life from '@/components/life.vue'
import labor from '@/components/labor.vue'
import about from '@/components/about.vue'
import index from '@/components/index.vue'
import detail from '@/components/artdetail.vue'



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
    }
  ]
})
