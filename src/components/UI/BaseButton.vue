<template>
  <router-link v-if="what === 'link'" :to="internal"><slot></slot></router-link>
  <button v-else :class="mode"><slot></slot></button>
</template>
<script>
export default {
  props: ["mode", "what", "internal"],
};
</script>
<style scoped>
a,
button {
  border: 0px solid rgb(214, 214, 214);
  padding: 0.5rem 2rem;
  margin-right: 0.5rem;
  margin-bottom: 0.3rem;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
.flat {
  background-color: rgb(82, 153, 201);
  color: white;
}
.outline-flat {
  color: rgb(35, 137, 204);
  background: rgb(208, 225, 236);
  border: 1px solid rgb(82, 153, 201);
}
.tab {
  background-color: rgb(82, 153, 201);
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: white;
  margin-right: 0;
  border-right: 1px solid white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.outline {
  background-color: rgb(233, 255, 240);
  border: 1px solid rgb(46, 116, 69);
}
.outline-danger {
  background-color: rgb(241, 215, 215);
  border: 1px solid rgb(235, 58, 58);
  color: rgb(197, 0, 0);
  font-weight: 500;
}
.re-apply {
  background-color: rgb(208, 231, 208);
  color: rgb(1, 133, 1);
  border: 1px solid rgb(47, 134, 47);
}
.cancel {
}
.guestbutton {
  background-color: rgb(240, 106, 106);
  color: white;
}
.login {
  background-color: rgb(49, 182, 49);
  font-weight: bold;
  color: white;
}
.signup {
  background-color: rgb(219, 41, 41);
  font-weight: bold;
  color: white;
}
.logout {
  background-color: rgb(253, 238, 238);
  font-weight: 500;
  color: rgb(80, 0, 0);
}
.logout:hover {
  background-color: rgb(189, 0, 0);
  color: rgb(255, 255, 255);
}
.login-outline {
  border: 1px solid rgb(49, 182, 49);
  font-weight: bold;
}
.signup-outline {
  border: 1px solid rgb(219, 41, 41);
  font-weight: bold;
}
.rounded {
  border-radius: 12px;
}
/* @media only screen and (max-width: 500px) {
  button {
    margin-bottom: 2px;
  }
} */
</style>
