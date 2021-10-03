import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  namespaced: true,
  state() {
    return {
      allPlayers: [
        { id: "", name: "", position: "gk", team: "home" },
        { id: "", name: "", position: "dmc", team: "home" },
        { id: "", name: "", position: "aml", team: "home" },
        { id: "", name: "", position: "amr", team: "home" },
        { id: "", name: "", position: "cf", team: "home" },
        { id: "", name: "", position: "sub1", team: "home" },
        { id: "", name: "", position: "sub2", team: "home" },
        { id: "", name: "", position: "gk", team: "away" },
        { id: "", name: "", position: "dmc", team: "away" },
        { id: "", name: "", position: "aml", team: "away" },
        { id: "", name: "", position: "amr", team: "away" },
        { id: "", name: "", position: "cf", team: "away" },
        { id: "", name: "", position: "sub1", team: "away" },
        { id: "", name: "", position: "sub2", team: "away" },
      ],
      players: [],
      declined: [],
      error: null,
      isApplied: false,
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
};
