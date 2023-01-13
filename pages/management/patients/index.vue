<script>
export default {
  head() {
    return {
      title: `${this.title} | Manajemen`,
    };
  },
  data() {
    return {
      title: "Pasien",
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" />

    <div class="row">
      <patient-table />
    </div>
  </div>
</template>
