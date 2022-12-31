<script>
/**
 * Dashboard component
 */
export default {
  head() {
    return {
      title: `${this.title}`,
    };
  },
  data() {
    return {
      title: "Beranda",
      items: [],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn;
    },
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
