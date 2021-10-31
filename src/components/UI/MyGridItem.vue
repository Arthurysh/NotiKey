<template>
  <div class="grid-item">
    <slot> </slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.grid-item {
  flex-basis: calc((100% - 40px) / 3);
  margin-bottom: 20px;
  margin-right: 20px;
  min-width: 0
}

.grid-item:nth-child(3n + 3) {
  margin-right: 0;
}

@media screen and (max-width: 872px) {
  .grid-item {
    flex-basis: calc((100% - 30px) / 2);
    margin-right: 0;
  }
}

@media screen and (max-width: 540px) {
  .grid-item {
    flex-basis: 100%;
  }
}
</style>