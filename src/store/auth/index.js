import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  state() {
    return {
      isLoggedIn: false,
      name: null,
      email: null,
      token: null,
      userId: null,
      userPhoto: null,
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
};
