<template>
<section>
    <div class="container">
        <slot>

        </slot>
    </div>
</section>
</template>

<script>
export default {
    name: 'my-section',
}
</script>

<style>
.container {
    padding: 0 20px;
}

</style>