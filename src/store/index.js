import { createStore } from 'vuex';
import coachesModules from './modules/coaches/index';
import requestsModules from './modules/requests/index';
// import requestsModules from './modules/requests/index';

const store = createStore({
  modules: {
    // The key is the namespace config
    coaches: coachesModules,
    requests: requestsModules,
  },
  state() {
    return {
      userId: 'c1',
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
