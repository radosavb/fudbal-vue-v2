<template>
  <profile-card>
    <template v-slot:emailSlot>{{ email }}</template>
    <template v-slot:photoSlot><img :src="photo" /></template>
    <template v-slot:nameSlot
      ><h4>{{ nameSurname }}</h4></template
    >
  </profile-card>
</template>

<script>
import ProfileCard from "../UI/ProfileCard.vue";
export default {
  components: { ProfileCard },
  data() {
    return {
      selectedUser: null,
    };
  },
  props: ["id"],
  computed: {
    nameSurname() {
      return this.selectedUser.name;
    },
    email() {
      return this.selectedUser.email;
    },
    photo() {
      return this.selectedUser.photoUrl;
    },
  },
  created() {
    this.selectedUser = this.$store.getters.getUsers.find(
      (use) => use.userId === this.id
    );
  },
};
</script>

<style scoped>
img {
  max-width: 200px;
  border: 2px solid lightgray;
  border-radius: 20px;
}
button {
  font-size: 120%;
  padding: 5px 0.5rem;
}
</style>
