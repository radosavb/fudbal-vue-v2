export default {
  state() {
    return {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      dayInWeek: new Date().getDay(),
    };
  },
  getters: {
    getDay(state) {
      return state.day;
    },
    getMonth(state) {
      return state.month;
    },
    getDayInWeek(state) {
      return state.dayInWeek;
    },
  },
};
