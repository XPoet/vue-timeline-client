import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Notes from '../views/Notes'
import NoteDetail from '../views/NoteDetail'
import NoteEdit from '../views/NoteEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: 'Notes'}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/notes',
    name: 'Notes',
    // 懒加载
    component: () => import('../views/Notes')
  },
  {
    path: '/note/add',
    name: 'NoteAdd',
    component: NoteEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/note/:noteId',
    name: 'NoteDetail',
    component: NoteDetail
  },
  {
    path: '/note/:noteId/edit',
    name: 'NoteEdit',
    component: NoteEdit,
    meta: {
      requireAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
