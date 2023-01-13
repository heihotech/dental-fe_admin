<script>
export default {
  head() {
    return {
      title: `${this.title} | Manajemen`,
    };
  },
  data() {
    return {
      title: "Reservasi",
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" />

    <div class="row">
      <book-order-table />
    </div>
  </div>
</template>
