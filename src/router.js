import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/dashboard/components/Login'
Vue.use(Router)
const routes = [
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),
    children: [
      {
        name: 'UserProfile',
        path: 'user',
        component: () => import('@/views/dashboard/pages/UserProfile')
      },
      {
        name: 'EmployeeManagement',
        path: 'employee-management',
        component: () => import('@/views/dashboard/tables/empManagement')
      },
      {
        name: 'DepartmentManagement',
        path: 'department-management',
        component: () => import('@/views/dashboard/tables/depManagement')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['Login']
  const ManagerPages = ['EmployeeManagement', 'DepartmentManagement', 'UserProfile']
  const authRequired = !publicPages.includes(to.name)
  const user = JSON.parse(localStorage.getItem('UserInfo')).user
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (user === null) {
    // chưa đăng nhập
    if (authRequired) {
      next('/login')
    } else {
      next()
    }
  } else {
    // đã đăng nhập
    if ((user.roleId === 1 || user.roleId === 3) && ManagerPages.includes(to.name)) {
      next()
    } else if (user.roleId === 2) {
      next('/login')
    } else {
      next('/user')
    }
  }
})
export default router
