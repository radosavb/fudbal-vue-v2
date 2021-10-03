<template>
  <ul>
    <single-player
      v-for="(pl, index) in players"
      :key="index"
      :idx="index"
      :name="pl.name"
      :team="pl.team"
      :position="pl.position"
      :userId="pl.id"
      :photo="pl.photo"
      :guestId="pl.guestId"
      :day="day"
    ></single-player>
  </ul>
</template>

<script>
import SinglePlayer from "./SinglePlayer.vue";
export default {
  components: { SinglePlayer },
  props: ["day"],
  data() {
    return {
      players: this.$store.getters["players/allPlayers"],
    };
  },
};
</script>

<style></style>
