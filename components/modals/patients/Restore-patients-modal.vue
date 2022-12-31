<script>
export default {
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
      patient: {
        fullName: null,
      },
      //
      dismissSecs: 5,
      dismissCountDown: 0,
      err: null,
      variant: "danger",
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(msg, variant) {
      this.err = msg;
      this.variant = variant;
      this.dismissCountDown = this.dismissSecs;
    },
    resetModal() {
      this.$emit("close");
      this.isModalActive = !this.isModalActive;
    },
    async handleOk() {
      const url = "/api/patients/" + this.id + "/restore";

      this.isBusy = true;

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
  },
  async fetch() {
    this.isBusy = true;
    let url = "/api/patients/" + this.id + "?includeDeleted=true";
    try {
      const resp = await this.$axios.get(url);

      if (resp.data) {
        // begin patient
        if (resp.data.data) {
          for (const key in resp.data.data) {
            if (
              resp.data.data.hasOwnProperty(key) &&
              this.patient.hasOwnProperty(key)
            ) {
              this.patient[key] = resp.data.data[key];
            }
          }
        }
        // end patient
      }
    } catch (error) {}

    console.log("fetched at: " + this.$fetchState.timestamp);
    this.isBusy = false;
  },
};
</script>

<template>
  <div>
    <b-modal
      v-model="isModalActive"
      scrollable
      title="Restore Pasien"
      title-class="font-18"
      @close="resetModal"
      @hide="resetModal"
    >
      <p v-if="patient.fullName" class="text-center">
        Apakah anda yakin mengembalikan
        <b>{{ patient.fullName }}</b> ini?
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
          variant="primary"
          type="submit"
          @click="handleOk"
          class="float-right"
          form="user-complete-form"
          :disabled="isBusy"
        >
          Restore
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
