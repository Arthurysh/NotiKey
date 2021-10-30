<template>
  <left-side></left-side>
  <right-side :isRegistration="this.isRegistration"></right-side>
</template>

<script>
import LeftSide from '@/components/Authorization/LeftSide.vue'
import RightSide from '@/components/Authorization/RightSide.vue'

export default {
  components: {
    LeftSide,
    RightSide,
  },
  props: {
    isRegistration: {
      type: Boolean,
      required: true,
    }
  }
};
</script>

<style>

</style>