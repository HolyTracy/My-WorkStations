<template>
    <div>
        <Slider v-model="value" range />
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            value: [9, Math.PI]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
