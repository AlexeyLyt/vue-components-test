import Vue from 'vue'
import VueRouter from 'vue-router'
import Tree from '../views/Tree.vue'
import TreeFiltered from '../views/TreeFiltered.vue'
import TreeDevExtreme from '../views/TreeDevExtreme.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Tree',
    component: Tree
  },
  {
    path: '/1',
    name: 'TreeFiltered',
    component: TreeFiltered
  },
  {
    path: '/2',
    name: 'TreeDevExtreme',
    component: TreeDevExtreme
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
