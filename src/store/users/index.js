import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  state() {
    return {
      users: [],
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
};
