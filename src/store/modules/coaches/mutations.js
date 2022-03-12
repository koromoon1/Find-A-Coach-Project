export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    // the payload is a list of coaches
    state.coaches = payload;
  },
};
