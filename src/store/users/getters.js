export default {
  getUsers(state) {
    return state.users;
  },
  isUser(state, _, __, rootGetters) {
    const id = rootGetters.getUserId;
    return state.users.some((user) => user.userId === id);
  },
  //Ako bi status igre bio sacuvan u nalogu usera

  // getPlayers(state) {
  //   return state.users.filter((user) => {
  //     user.status === 2;
  //   });
  // },
};
