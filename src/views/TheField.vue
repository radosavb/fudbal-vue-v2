<template>
  <div class="all">
    <base-dialog :title="error" show v-if="!!error" @close="handleError">{{
      error
    }}</base-dialog>
    <base-dialog
      title="Potvrdite odustanak"
      show
      v-if="modalIsOpened"
      @close="closeModal"
      ><base-button @click="cancelPlay" mode="flat rounded"
        >Potvrdi odustanak</base-button
      ></base-dialog
    >
    <base-dialog
      title="Potvrdite odustanak drugara"
      show
      v-if="modalIsOpened1"
      @close="closeModal1"
      ><base-button @click="odjaviDrugara(guestId)" mode="flat"
        >Potvrdi odustanak</base-button
      ></base-dialog
    >
    <div class="wrap">
      <!-- <div>
        Uloguj se klikom na link "Log In" u desnom uglu. Ako nemaš profil
        registruj se unosom bilo kog emaila (može biti i nepostojeći) i šifre
        duže od 6 karaktera i klikom na dugme "Registruj se".
        <p>
          Kada izabereš željeni dan prijavi se za fudbal klikom na fudbalsku
          loptu na terenu a potom klikom na dugme "Prijavi se". Na isti način
          prijavljuješ i drugara: klikom na fudbalsku loptu, unosom imena
          drugara i klikom na dugme "Prijavi drugara".
        </p>
        Sebe i drugare možeš odjaviti kada si ulogovan klikom na odgovarajuću dugmad koja su se pojavila nakon prijave.

        Ako si siguran da izabrani dan ne dolaziš na fudbal klikni na crveno
        dugme "Ne dolazim" koje se nalazi iznad terena. Ako se ipak predomisliš
        možeš se vratiti u neodređene klikom na odgovarajuće dugme ili prijaviti
        za fudbal klikom na loptu.
      </div> -->
      <div class="home">
        <all-players :day="day"></all-players>
        <div class="button-group">
          <base-button
            @click="openModal"
            mode="outline-danger rounded"
            v-if="isApplied && isLoggedIn"
            >Odjavi se</base-button
          >
          <base-button
            class="signup"
            v-else-if="isUser && isLoggedIn && !isDeclined && !isApplied"
            @click="notComing"
            >Ne dolazim</base-button
          >
          <base-button
            mode="re-apply"
            v-else-if="isLoggedIn && isUser"
            @click="reApply"
            >Vrati me u neodredjene</base-button
          >
          <base-button
            @click="[openModal1(), prenesiId(guest.guestPersonalId)]"
            v-for="guest in myGuests"
            :key="guest.guestId"
            mode="guestbutton"
            >Odjavi {{ guest.name }}</base-button
          >
        </div>
      </div>

      <div class="usersContainer">
        <!-- <div class="manual-buttons">
          <base-button mode="outline" v-if="!manualOpened"
            >Uputstvo za prijavu</base-button
          >
          <base-button mode="outline-danger" v-else
            >Zatvori uputstvo</base-button
          >
        </div> -->

        <div class="day-header">
          {{ day.slice(0, 1).toUpperCase() + day.slice(1) }}
        </div>
        <div class="appliedCancelled">
          <p class="applied">Dolazi: {{ numberOfPlayers }}</p>
          <p class="cancelled">Ne dolazi: {{ numberOfCancelled }}</p>
        </div>
        <users-list class="singleUser"></users-list>
      </div>
    </div>
  </div>
</template>

<script>
import AllPlayers from "../components/players/AllPlayers.vue";
import UsersList from "../components/users/UsersList.vue";

export default {
  components: {
    AllPlayers,
    UsersList,
  },
  props: ["day"],
  data() {
    return {
      modalIsOpened: false,
      modalIsOpened1: false,
      guestId: "",
      manualOpened: false,
    };
  },
  computed: {
    error() {
      return this.$store.getters["players/getError"];
    },
    isApplied() {
      return this.$store.getters["players/isApplied"];
    },
    isDeclined() {
      return this.$store.getters["players/isDeclined"];
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    numberOfPlayers() {
      return this.$store.getters["players/numberOfPlayers"];
    },
    numberOfCancelled() {
      return this.$store.getters["players/numberOfCancelled"];
    },
    myGuests() {
      return this.$store.getters["players/getMyGuests"];
    },
    userId() {
      return this.$store.getters.getUserId;
    },
    isUser() {
      return this.$store.getters.isUser;
    },
    getDate() {
      return this.$store.getters.getDate;
    },
  },
  methods: {
    handleError() {
      this.$store.dispatch("players/setError");
    },
    cancelPlay() {
      this.$store.dispatch("players/deleteAplication", { day: this.day });
      this.modalIsOpened = false;
    },
    odjaviDrugara(id) {
      this.$store.dispatch("players/deleteGuestAplication", {
        id: id,
        day: this.day,
      });
      this.modalIsOpened1 = false;
    },
    reApply() {
      this.$store.dispatch("players/reApply", { day: this.day });
    },
    prenesiId(id) {
      this.guestId = id;
    },
    openModal() {
      this.modalIsOpened = true;
    },
    closeModal() {
      this.modalIsOpened = false;
    },
    openModal1() {
      this.modalIsOpened1 = true;
    },
    closeModal1() {
      this.modalIsOpened1 = false;
    },
    notComing() {
      this.$store.dispatch("players/declineFootball", {
        userId: this.userId,
        day: this.day,
      });
    },
  },
  created() {
    this.$store.dispatch("players/loadPlayers", { day: this.day });
    this.$store.dispatch("players/loadDeclined", { day: this.day });
    this.$store.dispatch("loadUsers");
  },
};
</script>
<style scoped>
.home {
  position: relative;
  min-width: 900px;
  max-width: 900px;
  height: 600px;
  margin-left: 3%;
  margin-top: 2.5rem;
  background-image: url("../assets/field.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}
.appliedCancelled {
  display: flex;
}
.appliedCancelled p {
  width: 50%;
}
.manual-buttons {
  margin-top: -1rem;
}
.wrap {
  display: flex;
}
.singleUser {
  display: flex;
  flex-wrap: wrap;
}
.button-group {
  margin-top: -2.4rem;
}
.usersContainer {
  padding: 1rem;
  width: 100%;
  max-width: 600px;
}
.usersContainer p {
  /* color: white; */
  margin-bottom: 10px;
  padding: 6px;
  font-weight: bold;
  text-align: center;
}
.applied {
  border: 1px solid rgb(73, 196, 73);
  color: rgb(15, 173, 36);
  background-color: rgb(242, 255, 242);
}
.cancelled {
  border: 1px solid rgb(247, 81, 81);
  color: rgb(243, 24, 24);
  background-color: rgb(255, 244, 244);
}
.day-header {
  /* background-color: rgb(64, 119, 192); */
  background-color: rgb(82, 153, 201);
  font-weight: bold;
  color: white;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 2px;
}
@media only screen and (max-width: 1000px) {
  .wrap {
    display: block;
  }
  .home {
    /* margin-top: 2.5rem; */
  }
  .usersContainer {
    margin-top: 5.5rem;
  }
  .singleUsers {
    display: flex;
    flex-wrap: wrap;
  }
  .appliedCancelled {
    max-width: 900px;
  }
}
@media only screen and (max-width: 700px) {
  .appliedCancelled,
  .day-header {
    font-size: 35px;
  }
  button {
    font-size: 30px;
    font-weight: bold;
    padding: 2px 0.5rem;
  }
  .appliedCancelled {
    display: flex;
  }
}
@media only screen and (max-width: 1180px) {
  .appliedCancelled p {
    width: 100%;
    margin-bottom: 2px !important;
  }
  .home {
    margin-left: 0;
  }
}
@media only screen and (max-width: 984px) {
  .usersContainer {
    min-width: 100%;
    margin: auto;
    margin-top: 5.5rem;
  }
}
</style>
