export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    // the payload is a list of coaches
    state.coaches = payload;
  },
  // Record last fetch time
  setFetchTimeStamp(state) {
    state.lastFetch = new Date().getTime(); // get current time
  },
};
