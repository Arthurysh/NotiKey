<template>
  <button type="submit">
      <slot>

      </slot>
  </button>
</template>

<script>
export default {
    name: 'my-button',
}
</script>

<style scoped>
button {
  border-radius: 30px;
  background: #4599F5;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 14px;
  transition: color 0.5s;
  transition: background-color 0.5s;;
}

button:hover {
  background: #267DDD;
  color: #fff;
}

.is-not-active-btn {
    background: #818181;
}

.is-not-active-btn:hover {
    background: #5f5f5f;
    color: rgb(204, 204, 204);
}
</style>