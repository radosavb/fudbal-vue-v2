<template>
  <div class="tabs">
    <base-button mode="tab" @click="changeDay(1)" :class="{ active: day == 1 }"
      >Pondeljak {{ initialDayM(1) }}
    </base-button>
    <base-button mode="tab" @click="changeDay(2)" :class="{ active: day == 2 }"
      >Utorak {{ initialDayM(2) }}</base-button
    >
    <base-button mode="tab" @click="changeDay(3)" :class="{ active: day == 3 }"
      >Sreda {{ initialDayM(3) }}</base-button
    >
    <base-button mode="tab" @click="changeDay(4)" :class="{ active: day == 4 }"
      >Četvrtak {{ initialDayM(4) }}</base-button
    >
    <base-button mode="tab" @click="changeDay(5)" :class="{ active: day == 5 }"
      >Petak {{ initialDayM(5) }}</base-button
    >
    <base-button mode="tab" @click="changeDay(6)" :class="{ active: day == 6 }"
      >Subota {{ initialDayM(6) }}</base-button
    >
    <base-button mode="tab" @click="changeDay(0)" :class="{ active: day == 0 }"
      >Nedelja {{ initialDayM(0) }}</base-button
    >
  </div>

  <the-field day="ponedeljak" v-if="day == 1"></the-field>
  <the-field day="utorak" v-if="day == 2"></the-field>
  <the-field day="sreda" v-if="day == 3"></the-field>
  <the-field day="četvrtak" v-if="day == 4"></the-field>
  <the-field day="petak" v-if="day == 5"></the-field>
  <the-field day="subota" v-if="day == 6"></the-field>
  <the-field day="nedelja" v-if="day == 0"></the-field>
</template>

<script>
import TheField from "./TheField.vue";
export default {
  components: { TheField },
  data() {
    return {
      day: null,
      index: 1,
      date: null,
    };
  },
  computed: {
    dayInWeek() {
      return this.$store.getters.getDayInWeek;
    },
    dayInMonth() {
      return this.$store.getters.getDay;
    },
    month() {
      return this.$store.getters.getMonth + 1;
    },
    initialDay() {
      return this.dayInMonth + "." + this.month + ".";
    },
    date1() {
      return this.date.setDate(this.date.getDate() + 1);
    },
  },
  methods: {
    changeDay(day) {
      this.day = day;
    },
    initialDayM(n) {
      if (n == this.dayInWeek) {
        return `${this.dayInMonth}.${this.month}.`;
        // return this.date;
      } else if (n > this.dayInWeek && this.dayInMonth < 31) {
        return `${
          this.dayInMonth + n - this.dayInWeek < 31
            ? this.dayInMonth + n - this.dayInWeek + "." + this.month + "."
            : "okt"
        }`;
        // return this.date1.toLocaleString();
      } else if (n < this.dayInWeek && this.dayInMonth < 31) {
        return `${
          this.dayInMonth + 7 + n - this.dayInWeek < 31
            ? this.dayInMonth + 7 + n - this.dayInWeek + "." + this.month + "."
            : "okt"
        }`;
      } else {
        return "okt";
      }
    },
  },
  // watch:{
  //   dateChange(curr, old){

  //   }
  // },
  created() {
    this.day = this.dayInWeek;
    this.date = new Date();
  },
};
</script>

<style scoped>
.active {
  background-color: rgb(149, 191, 219);
  color: rgb(0, 87, 145);
  border-bottom: 1px solid rgb(0, 87, 145);
  font-weight: 700;
}

.tabs > button {
  /* display: inline; */
}
@media only screen and (max-width: 700px) {
  .tabs > button {
    padding-right: 2rem;
    padding-left: 2rem;
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 0;
    border-bottom: 1px solid white;
  }
}
</style>
