export default {
  getToken(state) {
    return state.token;
  },
  getEmail(state) {
    return state.email;
  },
  getUserId(state) {
    return state.userId;
  },
  getName(state) {
    return state.name;
  },
  getPhoto(state) {
    return state.userPhoto;
  },
  isLoggedIn(state) {
    return !!state.token;
  },
};
