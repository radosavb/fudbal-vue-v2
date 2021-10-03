import { createStore } from "vuex";
import playerModule from "./players/index";
import authModule from "./auth/index";
import userModule from "./users/index";
import dateModule from "./dates/index";

export default createStore({
  modules: {
    players: playerModule,
    auth: authModule,
    users: userModule,
    date: dateModule,
  },
  getters: {},
  mutations: {},
  actions: {},
});
