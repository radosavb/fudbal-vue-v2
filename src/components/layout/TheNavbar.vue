<template>
  <div id="nav">
    <div class="links">
      <router-link to="/">Teren</router-link>
      <router-link v-if="isLoggedIn" to="/profile">Profil</router-link>
    </div>
    <span class="logo">Fudbal App</span>
    <div class="logs">
      <base-button v-if="!isLoggedIn" mode="flat" what="link" internal="/auth"
        >Log In</base-button
      >
      <base-button v-else mode="logout" @click="logout">Log Out</base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
export default {
  components: { BaseButton },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
#nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 3rem;
  background: rgb(149, 191, 219);
  font-size: 20px;
  font-weight: 700;
  padding-top: 0.5rem;
}
.links {
  /* margin-left: -1rem; */
}
a {
  text-decoration: none;
  margin: 0 1rem;
}
a:visited {
  color: black;
}
.logo {
  color: white;
}
button {
  color: black;
}
a:hover,
a.router-link-active {
  color: rgb(19, 101, 156);
  text-decoration: underline;
}
@media only screen and (max-width: 700px) {
  #nav {
    height: 3.5rem;
  }
  a,
  button {
    margin: 0 0.5rem;
    font-size: 35px;
    padding: 2px;
  }
  button {
    /* margin-top: -6px; */
  }
}
</style>
