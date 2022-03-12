export default {
  coaches(state) {
    return state.coaches;
  },
  // Helper getter: check there is coach or not
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  // Check more information in the vuex module
  isCoach(_, getters, _2, rootGetters) {
    // '_' and '_2' is a convention for saying I have to take these arguments but not using them
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId); // always go through all coaches
    // another way to not going through all coaches is get a status at root state
    // trun it to true and false depend on if user has loged in or not
  },
};
