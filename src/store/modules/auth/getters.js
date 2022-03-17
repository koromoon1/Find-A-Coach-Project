export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token; // !! make token a Boolean value
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
