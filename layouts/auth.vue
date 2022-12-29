<script>
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  },
};
</script>

<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
