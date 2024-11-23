import { createRouter, createWebHistory } from 'vue-router'

const isAuthenticated = () => {
  return localStorage.getItem('authorization') !== null
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        return isAuthenticated() ? '/app' : '/auth/login'
      },
    },
    {
      path: '/auth',
      name: 'auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/connect/LogIn.vue'),
        },
        {
          path: 'sign',
          name: 'sign',
          component: () => import('@/views/connect/SignIn.vue'),
        },
        //@ts-ignore
        {
          path: 'logout',
          name: 'logout',
          beforeEnter: (to, from, next) => {
            localStorage.removeItem('authorization');

            next('/auth/login');
          }
        },
      ],
    },
    {
      path: '/app',
      name: 'application',
      component: () => import('@/views/app/HomeView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const publicPaths = ['/auth/login', '/auth/sign']
  const authRequired = !publicPaths.includes(to.path)

  if (authRequired && !isAuthenticated()) {
    return next('/auth/login')
  }
  next()
})

export default router
