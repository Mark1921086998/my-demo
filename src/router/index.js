import Vue from 'vue'
import Router from 'vue-router'
// 引入 userElement 组件
import UserElement from '../components/userElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/rights/rights.vue'
import Roles from '../components/roles/roles.vue'
import Categories from '../components/categories/categories.vue'
import Goods from '../components/goods/goods.vue'
import GoodsAdd from '../components/goodsadd/goodsadd.vue'
import Orders from '../components/orders/orders.vue'
import Reports from '../components/reports/reports.vue'


// 引入 message
import { Message } from 'element-ui'

Vue.use(Router)

var router = new Router({
  routes: [
    // 当请求 根目录 重定向到 /home 中
    // { path: '/', redirect:  '/home'}, // 重定向
    { path: '/', redirect: { name: 'home' } },
    { path: '/userelement', component: UserElement }, // 使用 elementui 的路由
    { path: '/login', name: 'login', component: Login }, // 登录的路由
    { 
      path: '/home', name: 'home', component: Home,
      children: [
        { path: '/users', name: 'users', component: Users },  //添加一个 home 的子路由 users
        { path: '/rights', name: 'rights', component: Rights},  //添加一个 home 的子路由 rights
        { path: '/roles', name: 'roles' , component: Roles},   //添加一个 home 的子路由 roles
        { path: '/categories', name: 'categories', component: Categories}, // 添加一个 home 的子路由 Categories 商品分类
        { path: '/goods', name: 'goods', component: Goods }, // 添加一个 home 的子路由 goods 商品列表
        { path: '/goods/add', name: 'goodsadd', component: GoodsAdd}, //  商品列表中的添加页面
        { path: '/orders', name: 'orders', component: Orders},
        { path: '/reports', name: 'reports', component: Reports}
      ]
     } // home 的路由    
  ]
})

// 添加一个守卫路由
router.beforeEach((to, from, next) => {
    // 完成登陆逻辑
    // 只要请求的路径不是 login 就需要进行登陆验证
    if(to.path != '/login'){
      // 判断是否存在 token
      if(!window.localStorage.getItem('token')){
        // console.log(!window.localStorage.getItem('token'))
        Message({
          type: 'error',
          message: '您还没登陆'
        })
        router.push('/login')
        return
      }
    }
    next()
})

export default router