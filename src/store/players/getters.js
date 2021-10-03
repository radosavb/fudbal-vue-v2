export default {
  allPlayers(state) {
    return state.allPlayers;
  },
  getError(state) {
    return state.error;
  },
  numberOfPlayers(state) {
    return state.allPlayers.filter((player) => player.photo || player.guestId)
      .length;
  },
  numberOfCancelled(state) {
    return state.declined.length;
  },
  getMyGuests(state, _, __, rootGetters) {
    const id = rootGetters.getUserId;
    return state.allPlayers.filter((player) => player.guestId === id);
    // return id;
  },
  getAllGuests(state) {
    return state.allPlayers.filter((player) => player.guestId);
  },
  isApplied(state, _, __, rootGetters) {
    const id = rootGetters.getUserId;
    return state.allPlayers.some((player) => player.id === id);
  },
  getPlayers(state) {
    return state.players;
  },
  getDeclined(state) {
    return state.declined;
  },
  isDeclined(state, _, __, rootGetters) {
    const id = rootGetters.getUserId;
    return state.declined.some((player) => player === id);
  },
};
