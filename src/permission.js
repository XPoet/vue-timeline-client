import router from "./router";

router.beforeEach((to, from, next) => {

  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requireAuth)) {
    const token = localStorage.getItem('timeline_token');
    if (token) {
      if (to.path !== '/login') {
        next();
      }
    } else {
      next({path: '/login'});
    }
  } else {
    next();
  }
});
