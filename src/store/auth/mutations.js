export default {
  setUser(state, payload) {
    state.email = payload.email;
    state.token = payload.token;
    state.userId = payload.userId;
    state.name = payload.name;
    state.userPhoto = payload.userPhoto;
  },
  setUserPhoto(state, payload) {
    state.userPhoto = payload;
  },
  updateProfile(state, payload) {
    state.name = payload;
  },
  setIsLoggedIn(state, payload) {
    state.isLoggedIn = payload;
  },
};
