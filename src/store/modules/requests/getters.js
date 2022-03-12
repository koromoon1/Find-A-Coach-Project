export default {
  // requests(state, getters, rootState, rootGetters) {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    // console.log(state.requests);
    // filter requests
    return state.requests.filter((req) => req.coachId === coachId);
  },
  // hasRequests(state, getters) {
  hasRequests(_, getters) {
    // ↓ access the requests getter in the same file, right above there ↑
    return getters.requests && getters.requests.length > 0;
  },
};
