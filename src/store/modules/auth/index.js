import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  // not using namespace:  will keep previous code working without changing them
  state() {
    return {
      userId: null,
      token: null,
      // tokenExpiration: null,
      // Token Expiration only metters when reload the page
      didAutoLogout: false,
    };
  },
  mutations,
  actions,
  getters,
};
