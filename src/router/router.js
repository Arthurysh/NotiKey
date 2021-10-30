import Main from '@/pages/Main'
import Profile from '@/pages/Profile'
import Authorization from '@/pages/Authorization'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [{
        path: '/',
        component: Main
    },
    {
        path: '/Profile',
        component: Profile,
        meta: { authOnly: true }
    },
    {
        path: '/Authorization',
        component: Authorization,
        meta: { guestOnly: true }
    },
    {
        path: '/Registration',
        component: Authorization,
        meta: { guestOnly: true }
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
});

function isLoggedIn() {
    return localStorage.getItem("auth");
  }
  
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!isLoggedIn()) {
        next({
          path: "/Authorization",
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (isLoggedIn()) {
        next({
          path: "/Profile",
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next(); // make sure to always call next()!
    }
  });

export default router;