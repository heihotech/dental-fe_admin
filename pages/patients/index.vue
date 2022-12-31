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
