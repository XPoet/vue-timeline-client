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
        path: '/notes',
        name: 'Notes',
        component: Notes
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/note/add',
        name: 'NoteEdit',
        component: NoteEdit
    },
    {
        path: '/note/:noteId',
        name: 'NoteDetail',
        component: NoteDetail
    },
    {
        path: '/note/:id/edit',
        name: 'NoteEdit',
        component: NoteEdit
    },
    /*
    // 路由懒加载模式
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
    }
    */
]

const router = new VueRouter({
    routes
})

export default router
