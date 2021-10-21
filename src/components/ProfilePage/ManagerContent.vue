<template>
  <div
    class="manager-user-content"
    v-if="this.userItemID == 1 && this.userRole == 'Manager'"
  >
    <h1>Manager Hello user</h1>
  </div>
  <!-- Записи -->
  <div
    class="manager-note-content"
    v-if="this.userItemID == 2 && this.userRole == 'Manager'"
  >
    <h1>Manager Hello note</h1>
  </div>
  <!-- Скидки -->
  <div
    class="manager-discount-content"
    v-if="this.userItemID == 3 && this.userRole == 'Manager'"
  >
    <h1>Manager Hello discount</h1>
  </div>
</template>

<script>
export default {
    props: {
    userItemID: {
      type: Number,
      default: 1,
    },
    userRole: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>

</style>