<template>
  <div class="grid-items">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "my-grid",
};
</script>

<style scoped>
.grid-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

@media screen and (max-width: 872px) {
  .grid-items {
    justify-content: space-between;
  }
}
</style>