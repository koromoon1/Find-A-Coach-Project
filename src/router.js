import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetail';
import CoachesList from './pages/coaches/CoachesList';
import CoachRegistration from './pages/coaches/CoachRegistration';
import ContactCoach from './pages/requests/ContactCoach';
import RequestsReceived from './pages/requests/RequestsReceived';
import NotFound from './pages/NotFound';
import UserAuth from './pages/auth/UserAuth';
import store from './store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' }, // when nothing entered in url, redirect to '/coaches'
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true, // config to pass value of "id" into the component as props with name of "id"
      children: [
        // Children need another router view inside parent router
        { path: 'contact', component: ContactCoach }, // /coaches/id/contact
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    }, // sent from contact form
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }, // catch all route: not found page
  ],
});

// Create global navigation guard (Refuse user enter some pages by entering Url)
router.beforeEach(function (to, _, next) {
  // For the pages required authentication: (register & requests)
  // if not authenticated, redirect to log in page
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  }
  // For the pages required not authentication: (log in page)
  // If already logged in, redirect to coaches list
  else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  }
  // ↑ In this case, when user enter a url, the app is reloaded, and vuex lose all stored data, as well as token. So User will be seemed as logged out.
  // With no guards: to the next page
  else {
    next();
  }
});

export default router;
