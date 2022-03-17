export default {
  setUser(state, payload) {
    // response for sign up and log in are basiclly the same structure
    state.token = payload.token;
    state.userId = payload.userId;
    // ↓ reset didAutoLogout to make it work for next log in.
    state.didAutoLogout = false;
    // state.tokenExpiration = payload.tokenExpiration;
    // Token Expiration only metters when reload the page
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
