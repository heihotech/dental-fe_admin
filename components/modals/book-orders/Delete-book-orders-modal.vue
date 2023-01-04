<script>
import Multiselect from "vue-multiselect";
export default {
  components: { Multiselect },
  props: {
    id: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      isModalActive: true,
      isBusy: false,
      //
      bookOrder: {
        fullName: null,
      },
      //
      dismissSecs: 5,
      dismissCountDown: 0,
      err: null,
      variant: "danger",
      //
      roles: [],
    };
  },
  methods: {
    resetModal() {
      this.$emit("close");
      this.isModalActive = !this.isModalActive;
    },
    async submit() {
      this.isBusy = true;
      const url = "/api/book-orders/" + parseInt(this.id);

      try {
        const resp = await this.$axios.delete(url);

        if (resp.data) {
          this.$emit("close");
          this.isModalActive = !this.isModalActive;
        }
      } catch (error) {
        this.showAlert(
          `${error.response && (error.response.status || 500)}: ${
            error.response &&
            error.response.data &&
            (error.response.data.error || "Terjadi kesalahan!")
          }`,
          "danger"
        );
        console.log(error);
      }

      this.isBusy = false;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(msg, variant) {
      this.err = msg;
      this.variant = variant;
      this.dismissCountDown = this.dismissSecs;
    },
  },
  watch: {},
  computed: {
    isButtonSubmitDisable() {
      if (this.isBusy === true) {
        return true;
      } else {
        return false;
      }
    },
  },
  async fetch() {
    this.isBusy = true;
    let url =
      "/api/book-orders/" +
      this.id +
      "?withDoctor=true&withPatient=true&includeDeleted=true&withSchedule=true";
    try {
      const resp = await this.$axios.get(url);

      if (resp.data) {
        // begin bookOrder
        if (resp.data.data) {
          for (const key in resp.data.data) {
            if (
              resp.data.data.hasOwnProperty(key) &&
              this.bookOrder.hasOwnProperty(key)
            ) {
              this.bookOrder[key] = resp.data.data[key];
            }
          }
        }
        // end bookOrder
      }
    } catch (error) {}

    console.log("fetched at: " + this.$fetchState.timestamp);
    this.isBusy = false;
  },
  async created() {},
};
</script>

<template>
  <div>
    <b-modal
      v-model="isModalActive"
      scrollable
      title="Hapus Reservasi"
      title-class="font-18"
      @close="resetModal"
      @hide="resetModal"
    >
      <p v-if="bookOrder.fullName" class="text-center">
        Apakah anda yakin menghapus
        <b>{{ bookOrder.fullName }}</b
        >?
      </p>
      <div>
        <b-alert
          class="text-center"
          :show="dismissCountDown"
          dismissible
          :variant="variant"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
          {{ err }}
        </b-alert>
      </div>
      <template #modal-footer>
        <b-button variant="secondary" @click="resetModal()" class="float-right">
          Batal
        </b-button>
        <b-button
          variant="danger"
          type="submit"
          @click="submit"
          class="float-right"
          form="user-complete-form"
          :disabled="isBusy"
        >
          Hapus
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
