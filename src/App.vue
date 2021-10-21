<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

* {
  font-family: "Roboto", sans-serif;
}

/* @font-face {
  font-family: "Roboto";
  src: local("Roboto"), local("Roboto"),
    url("~@/fonts/Roboto-Regular.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Roboto";
  src: local("Roboto"), local("Roboto"),
    url("~@/fonts/Roboto-Light.woff2") format("woff2");
  font-weight: 100;
  font-style: normal;
} */
</style>