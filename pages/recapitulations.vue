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
      title: "Rekapitulasi",
      items: [],
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
  </div>
</template>

<style></style>
