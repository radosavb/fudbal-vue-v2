<template>
  <div class="outline">
    <header>
      <slot name="nameSlot"></slot>
    </header>
    <section>
      <slot name="emailSlot"></slot>
    </section>
    <div class="photo">
      <slot name="photoSlot"></slot>
    </div>
    <div class="inside"><slot></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
section {
  height: 2rem;
  text-align: right;
  margin-right: 1rem;
}
.outline {
  width: 80%;
  min-width: 530px;
  margin: 2rem auto;
  border: 1px solid transparent;
  border-radius: 16px;
}
.inside {
  padding: 2rem;
  background-color: rgb(234, 245, 255);
  display: flex;
  justify-content: center;
}
/* .photo {
  width: 300px;
  height: 200px;
  border: 2px solid red;
  overflow: hidden;
}
img {
  max-width: 300px;
  max-height: 400px;
} */
.photo {
  padding: 1rem;
}
img {
  /* width: 100%; */
  object-fit: cover;
  border: 2px solid lightgray;
  border-radius: 20px;
}
header {
  padding: 1rem;
  text-align: center;
  border-bottom: 2px solid rgb(149, 191, 219);
  background-color: rgb(234, 245, 255);
  color: rgb(19, 101, 156);
}
@media (max-width: 700px) {
  header,
  div {
    font-size: 130%;
  }
  section {
    font-size: 120%;
  }
  div button {
    font-size: 35px;
  }
}
</style>
