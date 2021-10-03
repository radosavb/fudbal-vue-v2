<template>
  <ul>
    <single-player
      v-for="(pl, index) in players"
      :key="index"
      :idx="index"
      :name="pl.name"
      :team="pl.team"
      :position="pl.position"
    ></single-player>
  </ul>
</template>

<script>
import SinglePlayer from "./SinglePlayer";
export default {
  components: { SinglePlayer },
  data() {
    return {
      players: this.$store.getters["players/allPlayers"],
    };
  },
};
</script>

<style></style>
