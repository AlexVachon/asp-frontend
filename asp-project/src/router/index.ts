import { createRouter, createWebHistory } from 'vue-router';

const isAuthenticated = () => {
  // Vérifie si un token est présent dans le localStorage pour déterminer l'authentification
  return localStorage.getItem('authToken') !== null;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        // Redirige vers /app si connecté, sinon vers /auth/login
        return isAuthenticated() ? '/app' : '/auth/login';
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
      ],
    },
    {
      path: '/app',
      name: 'application',
      component: () => import('@/views/app/HomeView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPaths = ['/auth/login', '/auth/sign'];
  const authRequired = !publicPaths.includes(to.path);

  if (authRequired && !isAuthenticated()) {
    return next('/auth/login');
  }
  next();
});

export default router;
