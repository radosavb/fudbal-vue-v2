<template>
  <profile-card email="email" name="username" userId="userId">
    <template v-slot:emailSlot>
      {{ email }}
    </template>
    <template v-slot:photoSlot>
      <img :src="userPhoto" />
    </template>
    <template v-slot:nameSlot
      ><h3 v-if="username && username !== 'undefined'">{{ username }}</h3>
      <h2 v-else>{{ "" }}</h2></template
    >
    <!-- <h3>{{ userId }}</h3> -->
    <div
      v-if="!changeButton && !changePasswordShow && isLoggedIn && isUser"
      class="profilPageBlock"
    >
      <base-button @click="buttonAction" mode="flat"
        >Izmeni podatke</base-button
      >
      <base-button class="flat" @click="buttonAction1"
        >Izmeni Sifru</base-button
      >
    </div>
    <div v-if="changeButton || !isUser">
      <h3 class="form-header" v-if="!isUser">
        Popuni podatke da bi mogao da se prijavis za fudbal
      </h3>
      <change-profile @close-profile="closeProfile"></change-profile>
    </div>
    <change-password
      @close-change="closeChange"
      v-if="changePasswordShow"
    ></change-password>
  </profile-card>
</template>

<script>
import ChangeProfile from "../../components/profile/ChangeProfile.vue";
import ChangePassword from "../../components/profile/ChangePassword.vue";
import ProfileCard from "../../components/UI/ProfileCard.vue";
export default {
  components: { ChangeProfile, ProfileCard, ChangePassword },
  data() {
    return {
      changeButton: false,
      changePasswordShow: false,
      poruka: "Popuni podatke da bi mogao da se prijavis za fudbal",
    };
  },
  computed: {
    email() {
      return this.$store.getters.getEmail;
    },
    userId() {
      return this.$store.getters.getUserId;
    },
    username() {
      return this.$store.getters.getName;
    },
    userPhoto() {
      return this.$store.getters.getPhoto;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isApplied() {
      return this.$store.getters["players/isApplied"];
    },
    isUser() {
      return this.$store.getters.isUser;
    },
  },
  methods: {
    buttonAction() {
      this.changePasswordShow = false;
      this.changeButton = true;
    },
    buttonAction1() {
      this.changeButton = false;
      this.changePasswordShow = true;
    },
    closeProfile() {
      this.changeButton = false;
    },
    closeChange() {
      this.changePasswordShow = false;
    },
    cancelPlay() {
      this.$store.dispatch("players/deleteAplication");
    },
  },
};
</script>

<style scoped>
.form-header {
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
  background-color: rgb(236, 111, 111);
  color: white;
}
h2 {
  color: red;
}
img {
  max-width: 200px;
  /* max-height: 200px; */
  border: 2px solid lightgray;
  border-radius: 20px;
}
@media screen and (max-width: 700px) {
  button {
    font-size: 120%;
    padding: 5px 0.5rem;
  }
}
</style>
