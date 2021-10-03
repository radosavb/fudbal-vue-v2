<template>
  <li
    :style="{ backgroundColor: 'red' }"
    :class="[team, positionClass]"
    @click="prijaviSe(idx)"
  >
    <div class="omotac">
      <slot></slot>
      <span class="pozicija">{{ position.toUpperCase() }}</span>
      <p class="ime">{{ name.charAt(0).toUpperCase() + name.slice(1) }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: ["name", "team", "position", "idx"],
  data() {
    return {
      current: null,
    };
  },
  computed: {
    pozadina() {
      if (this.name) {
        return (
          "background-image: url(" +
          require("../assets/" + this.name + ".jpg") +
          ")"
        );
      } else {
        return (
          "background-image: url(" + require("../assets/default.jpg") + ")"
        );
      }
    },

    positionClass() {
      return this.position + "_" + this.team;
    },
  },
  methods: {
    prijaviSe(idx) {
      this.$store.dispatch("players/changePlayers", {
        idx,
        position: this.position,
        team: this.team,
      });
    },
  },
};
</script>

<style scoped>
li {
  width: 6rem;
  height: 6rem;
  border-radius: 100%;
  list-style-type: none;
  background-size: cover;
  position: absolute;
  cursor: pointer;
}
.omotac {
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
}
.ime {
  position: absolute;
  top: 5rem;
  color: white;
  font-weight: 700;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.pozicija {
  color: white;
  position: absolute;
  top: -1rem;
  font-weight: 700;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.home {
  border: 2px solid rgb(62, 117, 219);
}
.away {
  border: 2px solid red;
}
.gk_home {
  top: 250px;
  left: 1%;
}
.dmc_home {
  top: 250px;
  left: 15%;
}
.aml_home {
  top: 50px;
  left: 30%;
}
.amr_home {
  top: 450px;
  left: 30%;
}
.cf_home {
  top: 250px;
  left: 35%;
}
.gk_away {
  top: 250px;
  left: 89%;
}
.dmc_away {
  top: 250px;
  left: 73%;
}
.aml_away {
  top: 450px;
  left: 60%;
}
.amr_away {
  top: 50px;
  left: 60%;
}
.cf_away {
  top: 250px;
  left: 55%;
}
.sub1_home {
  top: 600px;
  left: 10%;
}
.sub2_home {
  top: 600px;
  left: 30%;
}
.sub1_away {
  top: 600px;
  left: 60%;
}
.sub2_away {
  top: 600px;
  left: 80%;
}
</style>
