<template>
  <base-dialog
    show
    v-if="modalIsOpened"
    title="Potvrdi prijavu"
    @close="closeModal"
  >
    <div class="button-group">
      <base-button @click="prijaviSe" mode="login-outline rounded"
        >Prijavi se</base-button
      >
      <base-button @click="closeModal" mode="signup-outline"
        >Odustani</base-button
      >
    </div>
    <div class="guest-input">
      <!-- <label for="applyGuest">Prijavi drugara</label> -->
      <input
        type="text"
        id="applyGuest"
        name="applyGuest"
        v-model.trim="imeDrugara"
        placeholder="Unesi ime drugara..."
      />
      <base-button @click="prijaviDrugara" mode="login-outline"
        >Prijavi drugara</base-button
      >
      <p class="error" v-if="guestNameError">Unesi ime drugara</p>
    </div>
  </base-dialog>

  <base-dialog
    :title="error"
    show
    v-if="error"
    @close="closeModalError"
  ></base-dialog>
  <base-dialog
    :title="success"
    show
    v-if="success"
    @close="closeModalSuccess"
  ></base-dialog>

  <li :style="pozadina" :class="[team, positionClass]" @click="openModal()">
    <div class="omotac">
      <slot></slot>
      <span class="pozicija">{{ position.toUpperCase() }}</span>
      <p class="ime">{{ name.charAt(0).toUpperCase() + name.slice(1) }}</p>
    </div>
  </li>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
import BaseDialog from "../UI/BaseDialog.vue";

export default {
  components: { BaseButton, BaseDialog },
  props: [
    "name",
    "team",
    "position",
    "idx",
    "userId",
    "photo",
    "guestId",
    "day",
  ],

  data() {
    return {
      current: null,
      modalIsOpened: false,
      imeDrugara: "",
      guestNameError: false,
      error: "",
      success: "",
    };
  },
  computed: {
    pozadina() {
      if (this.userId && !this.guestId) {
        return "background-image: url(" + this.photo + ")";
      } else if (this.guestId) {
        return (
          "background-image: url(" + require("../../assets/default.jpg") + ")"
        );
      } else {
        return (
          "background-image: url(" + require("../../assets/lopta.jpg") + ")"
        );
      }
    },
    // userPhoto() {
    //   return localStorage.getItem("photo");
    // },
    // imageName() {
    //   return this.name.replace(" ", "_").toLowerCase().trim();
    // },

    positionClass() {
      return this.position + "_" + this.team;
    },
    allGuests() {
      return this.$store.getters["players/getAllGuests"];
    },
  },
  asyncComputed: {
    // getImage() {
    //   const storage = firebase.storage();
    //   storage
    //     .ref("tukan.PNG")
    //     .getDownloadURL()
    //     .then((url) => {
    //       return "background-image: url(" + url + ")";
    //     });
    // },
  },

  methods: {
    async prijaviSe() {
      try {
        await this.$store.dispatch("players/applyForGame", {
          idx: this.idx,
          position: this.position,
          team: this.team,
          day: this.day,
        });
        // this.success = "Uspesna prijava";
      } catch (error) {
        this.error = error;
      }
      this.modalIsOpened = false;
    },
    prijaviDrugara() {
      if (!this.imeDrugara) {
        this.guestNameError = true;
        return;
      }
      this.$store.dispatch("players/applyGuest", {
        name: this.imeDrugara,
        position: this.position,
        team: this.team,
        day: this.day,
      });
      this.modalIsOpened = false;
    },
    openModal() {
      this.modalIsOpened = true;
    },
    closeModal() {
      this.modalIsOpened = false;
      this.guestNameError = false;
    },
    closeModalError() {
      this.error = "";
    },
    closeModalSuccess() {
      this.success = "";
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.guest-input {
  padding: 1.5rem 0;
  /* display: flex; */
  line-height: 30px;
}
@media (max-width: 750px) {
  .guest-input {
    display: block;
    font-size: 30px;
  }
  .guest-input > button,
  .button-group > button {
    font-size: 25px;
  }
  input[type="text"] {
    margin: 0 5rem;
    padding: 5rem;
    font-size: 25px;
  }
}
input[type="text"] {
  margin: 0 0.5rem;
  padding: 0.4rem;
}
li {
  width: 6rem;
  height: 6rem;
  border-radius: 100%;
  list-style-type: none;
  background-size: cover;
  position: absolute;
  cursor: pointer;
}
.omotac {
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
}
.ime {
  position: absolute;
  top: 5rem;
  color: white;
  font-weight: 600;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.pozicija {
  color: white;
  position: absolute;
  top: -1rem;
  font-weight: 400;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.home {
  border: 2px solid rgb(62, 117, 219);
}
.away {
  border: 2px solid rgb(247, 203, 60);
}
.gk_home {
  top: 250px;
  left: 1%;
}
.dmc_home {
  top: 250px;
  left: 15%;
}
.aml_home {
  top: 50px;
  left: 30%;
}
.amr_home {
  top: 450px;
  left: 30%;
}
.cf_home {
  top: 250px;
  left: 35%;
}
.gk_away {
  top: 250px;
  left: 89%;
}
.dmc_away {
  top: 250px;
  left: 73%;
}
.aml_away {
  top: 450px;
  left: 60%;
}
.amr_away {
  top: 50px;
  left: 60%;
}
.cf_away {
  top: 250px;
  left: 55%;
}
.sub1_home {
  top: 600px;
  left: 10%;
}
.sub2_home {
  top: 600px;
  left: 30%;
}
.sub1_away {
  top: 600px;
  left: 60%;
}
.sub2_away {
  top: 600px;
  left: 80%;
}
</style>
