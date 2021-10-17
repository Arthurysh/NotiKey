<template>
  <input type="text" class="my-input-field" :placeholder=placeholderValue>
</template>

<script>
export default {
    name: 'my-input',
    props: {
        placeholderValue: {
            type: String,
            default: '',
        }
        
    }
}
</script>

<style>
.my-input-field {
    border: 1px solid #484848;
    padding: 8px 10px;
    border-radius: 5px;
}
</style>