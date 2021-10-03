export default {
  async loadUsers(context) {
    const response = await fetch(
      "https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    );
    const responseData = await response.json();
    // console.log(responseData);
    const usersList = [];
    for (const user in responseData) {
      usersList.push(responseData[user]);
    }
    context.commit("setUsers", usersList);
  },

  addNewUser(context, payload) {
    const users = context.state.users;
    if (
      !users.some((user) => {
        user.userId === payload.userId;
      })
    ) {
      context.commit("addUser", payload);
    } else {
      return;
    }
  },
};
