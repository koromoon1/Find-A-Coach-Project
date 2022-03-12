import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetail';
import CoachesList from './pages/coaches/CoachesList';
import CoachRegistration from './pages/coaches/CoachRegistration';
import ContactCoach from './pages/requests/ContactCoach';
import RequestsReceived from './pages/requests/RequestsReceived';
import NotFound from './pages/NotFound';

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
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestsReceived }, // sent from contact form
    { path: '/:notFound(.*)', component: NotFound }, // catch all route: not found page
  ],
});

export default router;
