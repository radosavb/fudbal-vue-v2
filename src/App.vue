<template>
  <div class="sve">
    <the-navbar></the-navbar>
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "./components/layout/TheNavbar.vue";

export default {
  components: { TheNavbar },
  created() {
    // this.$store.dispatch("players/loadPlayers");
    this.$store.dispatch("loadUsers");
    // this.$store.dispatch("players/loadDeclined");
    this.$store.dispatch("tryLogin");
  },
};
</script>

<style></style>

<style>
body {
  background-color: rgb(247, 251, 255);
}
.sve {
  width: 100%;
  display: grid;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
