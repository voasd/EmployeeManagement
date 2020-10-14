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
        name: 'User Profile',
        path: 'pages/user',
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

// router.beforeEach((to, from, next) => {
//   const publicPages = ['Login']
//   const ManagerPages = [
//     'EmployeeManagement',
//     'DepartmentManagement'
//   ]
//   const authRequired = !publicPages.includes(to.name)
//   const user = JSON.parse(localStorage.getItem('UserInfo'))
//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (user === null) {
//     // chưa đăng nhập
//     if (authRequired) {
//       next('/login')
//     } else {
//       next()
//     }
//   } else {
//     // đã đăng nhập
//     if (user.role !== 'Department Staff' && ManagerPages.includes(to.name)) {
//       next()
//     } else {
//       next('/pages/user')
//     }
//   }
// })
export default router
