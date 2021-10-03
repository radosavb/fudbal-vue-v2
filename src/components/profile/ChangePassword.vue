<template>
  <base-dialog show v-if="isLoading" title="Šaljem podatke na server...">
    <base-spinner></base-spinner
  ></base-dialog>
  <form @submit.prevent="changePassword">
    <table class="form-control">
      <tr>
        <td><label for="password">*Nova sifra:</label></td>
        <td>
          <input
            id="password"
            name="password"
            type="password"
            v-model="password"
          />
        </td>
      </tr>
      <tr>
        <td><label for="confirmed_password">*Potvrdi novu sifru:</label></td>
        <td>
          <input
            id="confirmed_password"
            name="confirmed_password"
            type="password"
            v-model="confirmedPassword"
          />
        </td>
      </tr>
    </table>

    <base-button mode="signup">Promeni Sifru</base-button>
    <base-button
      mode="outline-danger"
      type="button"
      @click="closeChangePassword"
      >Zatvori</base-button
    >
    <div class="notifications">
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </div>
  </form>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
export default {
  emits: ["close-change"],
  components: { BaseButton },
  data() {
    return {
      password: "",
      confirmedPassword: "",
      error: "",
      success: "",
      isLoading: false,
    };
  },
  methods: {
    async changePassword() {
      this.error = "";
      this.success = "";

      if (this.password !== this.confirmedPassword) {
        this.error = "Nepravilno ponovljena sifra";
        return;
      } else if (this.password.length < 6) {
        this.error = "Prekratka sifra";
      } else {
        this.isLoading = true;
        try {
          await this.$store.dispatch("changePassword", {
            idToken: this.userToken,
            password: this.password,
            returnSecureToken: false,
          });
          this.success = "USPESNO PROMENJENA SIFRA";
        } catch (error) {
          this.error = error;
        }
        this.isLoading = false;

        setTimeout(() => {
          this.$router.replace("/profile");
        }, 1000);
      }
    },
    closeChangePassword() {
      this.$emit("close-change");
    },
  },
  computed: {
    userToken() {
      return this.$store.getters.getToken;
    },
  },
};
</script>

<style scoped>
form {
  padding: 1rem;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 1rem;
  /* width: 95%; */
  margin: 1rem auto;
}

label {
  margin-right: 0.5rem;
  font-weight: bold;
}
input[type="password"] {
  padding: 0.2rem;
  outline: none;
  border: 1px solid lightblue;
}
.form-control {
  /* display: flex; */
  align-items: center;
  padding: 1rem;
  padding-left: 0;
}
.notifications p {
  padding: 0.5rem 1rem;
  color: white;
  font-weight: bold;
  margin-top: 1rem;
}
.success {
  background-color: rgb(60, 156, 48);
}
.error {
  background-color: rgb(233, 45, 45);
}
@media only screen and(max-width:600px) {
  /* form {
    width: 95%;
  } */
}
</style>
