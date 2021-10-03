<template>
  <base-dialog show v-if="!!error" title="Greska" @close="handleError">{{
    error
  }}</base-dialog>
  <base-dialog show v-if="isLoading" title="Logujem se...">
    <base-spinner></base-spinner
  ></base-dialog>

  <form @submit.prevent="authenticate">
    <table class="authTable">
      <tr class="tableRow">
        <td><label for="email">Email</label></td>
        <td>
          <input id="email" name="email" type="email" v-model.trim="email" />
        </td>
      </tr>
      <tr class="tableRow">
        <td><label for="password">Password</label></td>
        <td>
          <input
            id="password"
            name="password"
            type="password"
            v-model.trim="password"
          />
        </td>
      </tr>
    </table>

    <div class="form-control">
      <base-button :class="mode">{{ firstButtonText }}</base-button>
      <p v-if="mode === 'login'">ili ako nemas profil</p>
      <p v-else>ili ako imas profil</p>
      <a @click="changeMode" type="button" mode="outline"
        ><u>{{ secondButtonText }}</u></a
      >
    </div>
    <p class="error" v-if="!isFormValid">Oba polja moraju biti popunjena!</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      email: "",
      password: "",
      isFormValid: true,
      mode: "login",
      error: null,
    };
  },
  computed: {
    firstButtonText() {
      if (this.mode === "login") {
        return "Uloguj se";
      } else {
        return "Registruj se";
      }
    },
    secondButtonText() {
      if (this.mode === "login") {
        return "Registruj se";
      } else {
        return "Uloguj se";
      }
    },
  },
  methods: {
    async authenticate() {
      this.isFormValid = true;
      this.error = null;
      if (this.email === "" || this.password === "") {
        this.isFormValid = false;
        return;
      }
      this.isLoading = true;
      try {
        await this.$store.dispatch(`${this.mode}`, {
          email: this.email,
          password: this.password,
        });
        this.$router.replace("/profile");
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },

    changeMode() {
      this.mode === "login" ? (this.mode = "signup") : (this.mode = "login");
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  padding: 1rem;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 1rem;
  width: 50%;
  margin: 1rem auto;
  min-width: 490px;
}
tr {
  /* margin-bottom: 10rem; */
}
label {
  margin-right: 0.5rem;
}
input[type="email"],
input[type="password"] {
  padding: 0.2rem;
  outline: none;
  border: 1px solid lightblue;
}
.form-control {
  display: flex;
  align-items: center;
  padding: 1rem;
}
a {
  cursor: pointer;
  font-weight: 700;
  margin-left: 0.5rem;
}
.authTable {
  padding: 1rem;
}

.error {
  color: rgb(187, 25, 25);
}
table tr {
  height: 2rem;
}
@media only screen and (max-width: 700px) {
  form {
    width: 100%;
    font-size: 30px;
    min-width: 550px;
    margin-top: 2rem;
  }
  input[type="email"],
  input[type="password"] {
    padding: 0.5rem;
    font-size: 30px;
  }
  .tableRow {
    line-height: 2rem;
  }
  form button {
    font-size: 30px;
  }
  .form-control {
    display: block;
    text-align: center;
  }
}
</style>
