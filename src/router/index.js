import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/resetPassword', component: () => import('@/views/password/new'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/gitee', component: () => import('@/views/login/gitee'), hidden: true },
  { path: '/loginPhone', component: () => import('@/views/login/phone'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      // name: '首页',
      component: () => import('@/views/dashboard/index')
      // meta: { title: '首页', icon: 'nested' }
    }]
  },
  {
    path: '/system',
    component: Layout,
    hidden: false,
    children: [{
      path: 'data',
      name: '系统数据',
      component: () => import('@/views/system/data'),
      meta: { title: '系统数据', icon: '系统数据' }
    }]
  },
  {
    path: '/school',
    component: Layout,
    hidden: false,
    children: [{
      path: 'index',
      name: '学校管理',
      component: () => import('@/views/school/index'),
      meta: { title: '学校管理', icon: '学校管理' }
    }]
  },
  {
    path: '/exam',
    component: Layout,
    hidden: false,
    redirect: '/exam/sheet',
    name: '排考管理',
    meta: { title: '排考管理', icon: '排考管理' },
    children: [
      {
        path: 'sheet',
        name: '考试安排',
        component: () => import('@/views/exam/sheet'),
        meta: { title: '考试安排', icon: '考试安排' }
      },
      {
        path: 'examinee',
        name: '考生管理',
        component: () => import('@/views/exam/examinee'),
        meta: { title: '考生管理', icon: '考生管理' }
      },
      {
        path: 'examRoom',
        name: '考场管理',
        component: () => import('@/views/exam/examRoom'),
        meta: { title: '考场管理', icon: '考场管理' }
      },
      {
        path: 'invigilateTeacher',
        name: '监考老师管理',
        component: () => import('@/views/exam/invigilateTeacher'),
        meta: { title: '监考老师管理', icon: '监考老师管理' }
      },
      {
        path: 'examSubject',
        name: '考试科目管理',
        component: () => import('@/views/exam/examSubject'),
        meta: { title: '考试科目管理', icon: '考试科目管理' }
      },
      {
        path: 'examCard',
        name: '准考证管理',
        component: () => import('@/views/exam/examCard'),
        meta: { title: '准考证管理', icon: '准考证管理' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'manage',
        name: '用户管理',
        component: () => import('@/views/user/manage'),
        meta: { title: '用户管理', icon: '用户管理' }
      }
    ]
  },
  {
    path: '/sPersonal',
    component: Layout,
    hidden: false,
    name: '学生中心',
    redirect: '/sPersonal/sInfo',
    meta: { title: '学生中心', icon: '个人中心' },
    children: [
      {
        path: 'sInfo',
        name: '学生信息',
        component: () => import('@/views/personal/sInfo'),
        meta: { title: '学生信息', icon: '个人信息' }
      },
      {
        path: 'examInfo',
        name: '考试信息',
        component: () => import('@/views/personal/examInfo'),
        meta: { title: '考试信息', icon: '考试安排' }
      }
    ]
  },
  {
    path: '/tPersonal',
    component: Layout,
    hidden: false,
    name: '教师中心',
    redirect: '/tPersonal/tInfo',
    meta: { title: '教师中心', icon: '个人中心' },
    children: [
      {
        path: 'tInfo',
        name: '教师信息',
        component: () => import('@/views/personal/tInfo'),
        meta: { title: '教师信息', icon: '个人信息' }
      },
      {
        path: 'invigilateInfo',
        name: '监考信息',
        component: () => import('@/views/personal/invigilateInfo'),
        meta: { title: '监考信息', icon: '考试安排' }
      }
    ]
  },
  {
    path: '/aPersonal',
    component: Layout,
    hidden: false,
    name: '个人中心',
    redirect: '/aPersonal/aInfo',
    meta: { title: '个人中心', icon: '个人中心' },
    children: [
      {
        path: 'aInfo',
        name: '我的信息',
        component: () => import('@/views/personal/aInfo'),
        meta: { title: '我的信息', icon: '个人中心' }
      }
    ]
  },
  { path: '/chat',
    component: Layout,
    name: 'AI对话',
    redirect: '/chat/index',
    meta: { title: 'AI对话', icon: 'ChatGPT' },
    children: [
      {
        path: 'index',
        name: 'ChatGPT',
        component: () => import('@/views/chat/index'),
        meta: { title: 'ChatGPT', icon: 'ChatGPT' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
