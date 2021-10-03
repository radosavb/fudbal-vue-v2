export default {
  async applyForGame(context, payload) {
    const userId = context.rootGetters.getUserId;
    const name = context.rootGetters.getName;
    const userPhoto = localStorage.getItem("photo");
    const isUser = context.rootGetters.isUser;
    const day = payload.day;

    const allPlayers = context.state.allPlayers;
    const index = payload.idx;

    if (!userId) {
      context.commit("setError", "Ulogujte se da bi se prijavili");
      return;
    }
    if (!isUser) {
      context.commit(
        "setError",
        "Dodajte ime, prezime i sliku da bi se prijavili za fudbal!"
      );
      return;
    }
    if (allPlayers[index].name.length) {
      context.commit("setError", "Pozicija je vec zauzeta");
      return;
    }
    for (let i = 0; i < allPlayers.length; i++) {
      if (allPlayers[i].id === userId) {
        context.commit("setError", "Vec ste prijavljeni");
        return;
      }
    }

    const response = await fetch(
      `https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/players/${day}/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: userId,
          name: name,
          position: payload.position,
          team: payload.team,
          photo: userPhoto,
        }),
      }
    );
    const responseData = await response.json();
    // console.log(response);
    // console.log(responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.error.message || "Greska pri prijavljivanju za fudbal"
      );
      context.commit("setError", error);
    }

    context.commit("setError", "Uspesna Prijava");

    const player = {
      id: userId,
      name: name,
      position: payload.position,
      team: payload.team,
      photo: userPhoto,
    };
    for (let i = 0; i < allPlayers.length; i++) {
      if (
        allPlayers[i].position === player.position &&
        allPlayers[i].team === player.team
      ) {
        allPlayers.splice(i, 1, player);
      }
    }

    const declined = context.state.declined;
    if (declined.indexOf(userId) > -1) {
      context.dispatch("reApply", { day: day });
    }
  },

  reApply(context, payload) {
    const userId = context.rootGetters.getUserId;
    fetch(
      `https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/declined/${payload.day}/${userId}.json`,
      { method: "DELETE" }
    );
    context.commit("deleteDeclined", userId);
  },

  async applyGuest(context, payload) {
    const userId = context.rootGetters.getUserId;
    const day = payload.day;
    if (!userId) {
      context.commit("setError", "Ulogujte se da bi se prijavili drugara");
      return;
    }
    const response = await fetch(
      `https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/guests/${day}/${userId}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          guestId: userId,
          name: payload.name,
          position: payload.position,
          team: payload.team,
        }),
      }
    );
    const responseData = await response.json();
    // console.log(response);
    // console.log(responseData);
    const allPlayers = context.state.allPlayers;
    const player = {
      guestId: userId,
      guestPersonalId: responseData.name,
      name: payload.name,
      position: payload.position,
      team: payload.team,
    };
    for (let i = 0; i < allPlayers.length; i++) {
      if (
        allPlayers[i].position === player.position &&
        allPlayers[i].team === player.team
      ) {
        allPlayers.splice(i, 1, player);
      }
    }
  },

  async loadPlayers(context, payload) {
    const day = payload.day;
    context.commit("resetPlayers");
    const response = await fetch(
      `https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/players/${day}.json`
    );
    const responseData = await response.json();
    // console.log(responseData);
    const players = [];
    for (const key in responseData) {
      players.push(responseData[key]);
    }
    const responseGuests = await fetch(
      `https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/guests/${day}.json`
    );
    const responseDataGuests = await responseGuests.json();
    for (const gue in responseDataGuests) {
      for (const pom in responseDataGuests[gue]) {
        players.push({ guestPersonalId: pom, ...responseDataGuests[gue][pom] });
      }
    }

    context.commit("setPlayers", players);

    // console.log(provera);
    // console.log(players);
    const allPlayers = context.state.allPlayers;

    for (let i = 0; i < allPlayers.length; i++) {
      for (let j = 0; j < players.length; j++) {
        if (
          !allPlayers[i].name &&
          allPlayers[i].position === players[j].position &&
          allPlayers[i].team === players[j].team
        ) {
          allPlayers.splice(i, 1, players[j]);
        }
      }
    }

    // console.log(allPlayers);
    context.commit("setRegPlayers", allPlayers);
  },

  deleteAplication(context, payload) {
    const userId = context.rootGetters.getUserId;

    const allPlayers = context.state.allPlayers;
    const singlePlayer = allPlayers.find((player) => player.id === userId);

    const index = allPlayers.findIndex((pl) => pl.name === singlePlayer.name);

    allPlayers.splice(index, 1, {
      id: "",
      name: "",
      position: singlePlayer.position,
      team: singlePlayer.team,
    });

    fetch(
      `https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/players/${payload.day}/${userId}.json`,
      { method: "DELETE" }
    );
    context.commit("removePlayer", allPlayers);
  },

  async deleteGuestAplication(context, payload) {
    const userId = context.rootGetters.getUserId;
    await fetch(
      `https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/guests/${payload.day}/${userId}/${payload.id}.json`,
      { method: "DELETE" }
    );
    // console.log(response);
    const allPlayers = context.state.allPlayers;
    const singlePlayer = allPlayers.find(
      (player) => player.guestPersonalId === payload.id
    );

    const index = allPlayers.findIndex((pl) => pl.name === singlePlayer.name);

    allPlayers.splice(index, 1, {
      id: "",
      name: "",
      position: singlePlayer.position,
      team: singlePlayer.team,
    });
  },

  async declineFootball(context, payload) {
    const response = await fetch(
      `https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/declined/${payload.day}/${payload.userId}.json`,
      { method: "PUT", body: JSON.stringify(payload) }
    );
    const responseData = await response.json();
    // console.log(response);
    // console.log(responseData);
    context.commit("declineOne", responseData.userId);
  },

  async loadDeclined(context, payload) {
    const response = await fetch(
      `https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app/declined/${payload.day}.json`
    );
    const responseData = await response.json();
    // console.log(responseData);

    const declined_players = [];

    for (const dec in responseData) {
      declined_players.push(responseData[dec].userId);
    }
    // console.log(declined_players);
    context.commit("setDeclined", declined_players);
  },

  // async loadDeclined(context, payload) {},
  changeAppliedStatus(context, payload) {
    context.commit("changeAppliedStatus", payload);
  },

  setError(context) {
    context.commit("setError", null);
  },
};
