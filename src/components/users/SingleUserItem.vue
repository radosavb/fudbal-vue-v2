<template>
  <li class="single-user">
    <span :class="indication" class="indikacija"></span
    ><router-link :to="link">{{ name }}</router-link>
    <span class="user-photo"><img :src="photo" /></span>
  </li>
</template>

<script>
export default {
  props: ["name", "players", "userId", "declined", "photo"],
  computed: {
    // status() {
    //   return this.players.some((player) => player.name === this.name)
    //     ? "prijavljen"
    //     : "";
    // },
    // status1() {
    //   return this.declined.some((player) => player === this.userId)
    //     ? "odjavljen"
    //     : "";
    // },
    indication() {
      if (this.players.some((player) => player.id === this.userId)) {
        return "prijavljen";
      } else if (this.declined.some((player) => player === this.userId)) {
        return "odjavljen";
      } else {
        return "";
      }
    },
    link() {
      if (this.userId) {
        return "/users/" + this.userId;
      } else {
        return "/uu";
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
  cursor: pointer;
}
a:visited {
  text-decoration: none;
  color: black;
}
li {
  height: 30px;
  line-height: 30px;
  width: 49.5%;
  min-width: 220px;
  word-wrap: break-word;
  border: 1px solid lightblue;
  margin: 2px;
  margin-left: 0;

  /* border-top-left-radius: 15px;
  border-bottom-left-radius: 15px; */
}
span {
  display: inline-block;
}
.indikacija {
  height: 15px;
  width: 15px;
  background-color: lightblue;
  border-radius: 100%;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}
img {
  width: 26px;
  height: 26px;
  float: right;
  border-radius: 100%;
  margin-top: 1px;
}
.user-photo {
  float: right;
  margin-right: 0.5rem;
}
.prijavljen {
  background-color: rgb(104, 228, 104);
}
.odjavljen {
  background-color: rgb(253, 108, 108);
}
@media only screen and (max-width: 700px) {
  li {
    height: 40px;
    line-height: 40px;
    font-size: 30px;
    overflow: hidden;
  }
  img {
    width: 38px;
    height: 38px;
  }
  .indikacija {
    width: 27px;
    height: 27px;
  }
}
/* 
@media only screen and(max-width: 1000px) {
  li {
    display: flex;
  }
}
@media only screen and(max-width: 1400px) {
  li {
    width: 100% !important;
  }
} */
</style>
