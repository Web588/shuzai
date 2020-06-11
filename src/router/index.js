import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import rank from '../views/rank.vue'
import bookLists from '../views/bookLists.vue'
import categories from '../views/categories.vue'
import detail from '../views/categories/detail.vue'
import detailId from '../views/bookLists/bookList-detail.vue'
import rankDetail from '../views/rank/rank-detail.vue'
import bookDetail from '../views/book/book-detail.vue'
import readBook from '../views/book/readBook.vue'
import bookSelf from '../views/bookSelf/book-self.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home',component: Home},
  { path: '/rank', name: 'rank', component: rank },
  { path: '/search', name: 'search', component: Search },
  { path: '/mybooks', name: 'bookSelf', component: bookSelf },
  { path: '/bookLists', name: 'bookLists', component: bookLists },
  { path: '/categories', name: 'categories', component: categories },
  { path: '/categories/detail', name: 'detail', component: detail },
  { path: '/bookLists/:id', name: 'detailId', component: detailId },
  { path: '/rank/:item', name: 'rankDetail', component: rankDetail },
  { path: '/book/:id', name: 'bookDetail', component: bookDetail },
  { path: '/readBook/:id', name: 'readBook', component: readBook }

]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  history: false,
  hashbang: true,
  routes
});

export default router
