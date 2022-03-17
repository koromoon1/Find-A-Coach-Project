import { createStore } from 'vuex';
import coachesModules from './modules/coaches/index';
import requestsModules from './modules/requests/index';
import authModules from './modules/auth/index';

const store = createStore({
  modules: {
    // The key is the namespace config
    coaches: coachesModules,
    requests: requestsModules,
    auth: authModules,
  },
});

export default store;
