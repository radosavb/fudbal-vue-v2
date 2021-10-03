<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="show">
      <header>
        <slot name="header">
          <h3>{{ title }}</h3>
        </slot>
        <span @click="tryClose">&times;</span>
      </header>
      <section>
        <slot></slot>
      </section>
      <!-- <menu v-if="!fixed">
        <slot name="actions">
          <base-button @click="tryClose">Close</base-button>
        </slot>
      </menu> -->
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 150vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
span {
  cursor: pointer;
  font-size: 3.5rem;
  font-weight: 700;
  margin-top: -5px;
}
dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: rgb(41, 103, 145);
  color: white;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  line-height: 1.5rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}
menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
    /* height: 200vh; */
  }
}
@media (max-width: 700px) {
  div,
  header,
  section {
    font-size: 30px;
  }
  span {
    font-size: 5rem;
    font-weight: 100;
    /* margin-top: -10px; */
  }
}
</style>
