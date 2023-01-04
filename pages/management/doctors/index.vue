<script>
export default {
  head() {
    return {
      title: `${this.title} | Manajemen`,
    };
  },
  data() {
    return {
      title: "Dokter",
    };
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" />

    <div class="row">
      <doctor-table />
    </div>
  </div>
</template>
