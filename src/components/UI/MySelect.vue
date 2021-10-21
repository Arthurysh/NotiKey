<template>
  <select class="my-select-field">
    <option :value="this.plug">{{this.plug}}</option>
    <option :value="elem" v-for="elem in arrData" :key="elem">{{elem}}</option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    arrData: {
      type: Array,
      required: true,
    },
    plug: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.my-select-field {
    /* -webkit-appearance: none; */
    border: 1px solid #484848;
    padding: 8px 10px;
    border-radius: 5px;
    background: #fff;
}

</style>