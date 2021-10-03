export default {
  // addPlayer(state, payload) {
  //   state.players.push(payload);
  // },
  resetPlayers(state) {
    state.allPlayers = [
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
    ];
  },
  removePlayer(state, payload) {
    state.allPlayers = payload;
  },
  setRegPlayers(state, payload) {
    state.allPlayers = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  changeAppliedStatus(state, payload) {
    state.isApplied = payload;
  },
  setPlayers(state, payload) {
    state.players = payload;
  },
  setDeclined(state, payload) {
    state.declined = payload;
  },
  declineOne(state, payload) {
    state.declined.push(payload);
  },
  deleteDeclined(state, payload) {
    const index = state.declined.findIndex((dec) => dec === payload);
    state.declined.splice(index, 1);
  },
};
