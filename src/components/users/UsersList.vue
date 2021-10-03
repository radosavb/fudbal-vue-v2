<template>
  <ul>
    <single-user-item
      v-for="user in allUsers"
      :name="user.name"
      :key="user.userId"
      :userId="user.userId"
      :photo="user.photoUrl"
      :players="players"
      :declined="declined"
    ></single-user-item>
  </ul>
</template>

<script>
import SingleUserItem from "./SingleUserItem.vue";
export default {
  components: {
    SingleUserItem,
  },
  computed: {
    allUsers() {
      return this.users.concat(this.guests);
    },
    users() {
      return this.$store.getters.getUsers;
    },
    guests() {
      return this.$store.getters["players/getAllGuests"];
    },
    players() {
      return this.$store.getters["players/allPlayers"];
    },
    declined() {
      return this.$store.getters["players/getDeclined"];
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
