export default {
  async signup(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "signup" });
  },
  async login(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "login" });
  },

  async auth(context, payload) {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfPtJQLYGQGgKqj0cx-rNU6L-9DazzExA`;

    if (payload.mode === "login") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfPtJQLYGQGgKqj0cx-rNU6L-9DazzExA`;
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.error.message);
      throw err;
    }
    // console.log(response);
    // console.log(responseData);

    localStorage.setItem("email", responseData.email);
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("name", responseData.displayName);
    localStorage.setItem("photo", responseData.profilePicture);

    context.commit("setUser", {
      email: responseData.email,
      token: responseData.idToken,
      userId: responseData.localId,
      name: responseData.displayName,
      userPhoto: responseData.profilePicture,
    });

    context.commit("setIsLoggedIn", true);
  },

  setUser(context, payload) {
    context.commit("setUser", payload);
  },

  setUserPhoto(context, payload) {
    context.commit("setUserPhoto", payload);
  },

  tryLogin(context) {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const photo = localStorage.getItem("photo");

    if (userId && token) {
      context.commit("setUser", {
        email: email,
        token: token,
        userId: userId,
        name: name,
        userPhoto: photo,
      });
      context.commit("setIsLoggedIn", true);
    }
  },

  logout(context) {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("photo");

    context.commit("setUser", {
      email: null,
      token: null,
      userId: null,
      name: null,
      userPhoto: null,
    });

    context.commit("setIsLoggedIn", false);
  },

  async updateProfile(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAfPtJQLYGQGgKqj0cx-rNU6L-9DazzExA`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: context.state.token,
          displayName: payload.displayName,
          photoUrl: payload.photoUrl,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();

    // console.log(responseData);

    context.commit("updateProfile", responseData.displayName);
    localStorage.setItem("name", responseData.displayName);

    context.dispatch("registerUser", {
      email: responseData.email,
      userId: responseData.localId,
      name: responseData.displayName,
      photoUrl: payload.photoUrl,
    });
  },

  //USERS ACTION
  async registerUser(_, payload) {
    const userId = payload.userId;
    await fetch(
      `https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
    // const responseData = await response.json();
    //SET USERS
    // console.log(responseData);
  },
  async changePassword(_, payload) {
    const response = fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAfPtJQLYGQGgKqj0cx-rNU6L-9DazzExA",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    const responseData = await response;
    // console.log(response);
    // console.log(responseData);
    if (!responseData.ok) {
      const error = new Error(responseData.error || "Neuspeh");
      throw error;
    }
  },
};
