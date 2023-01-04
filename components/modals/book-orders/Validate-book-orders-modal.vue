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
        patientId: null,
        arrival: new Date(),
        doctor: null,
        patient: null,
        schedule: null,
      },
      //
      dismissSecs: 5,
      dismissCountDown: 0,
      err: null,
      variant: "danger",
      //
      selectedPatient: null,
      patientsFetchedData: [],
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
      delete this.bookOrder.patient;
      delete this.bookOrder.doctor;
      delete this.bookOrder.schedule;
      this.bookOrder.arrival = new Date();

      try {
        const resp = await this.$axios.patch(url, this.bookOrder);

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
    async fetchPatients(name) {
      this.isBusy = true;

      let url = "/api/patients?page=1&size=10&order=createdAt%3Adesc";

      if (name.length >= 3) {
        url = url + "&fullName=" + name;
      }

      try {
        const resp = await this.$axios.get(url);

        if (resp.data) {
          this.patientsFetchedData = [];
          if (resp.data.data.length > 0) {
            resp.data.data.map((el) => {
              this.patientsFetchedData.push({
                value: el.id,
                name: `${el.fullName ? el.fullName + " " : ""}`,
                phoneNumber: el.phoneNumber,
              });
            });
          }
        }
      } catch (error) {}

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
  watch: {
    selectedPatient: {
      handler: function () {
        if (this.selectedPatient !== null) {
          this.bookOrder.patientId = parseInt(this.selectedPatient.value);
          this.bookOrder.phoneNumber = this.selectedPatient.phoneNumber;
          this.bookOrder.fullName = this.selectedPatient.name;
        }
      },
    },
  },
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
      title="Validasi Kedatangan Pasien"
      title-class="font-18"
      size="md"
      @close="resetModal"
      @hide="resetModal"
    >
      <form @submit.prevent="submit" id="doctor-form">
        <div class="row">
          <div class="col-sm-12">
            <!-- userId -->
            <div class="mb-3">
              <label for="village">Nama Pasien</label>
              <multiselect
                v-model="selectedPatient"
                id="ajax"
                label="name"
                track-by="name"
                placeholder="Ketikkan nama"
                open-direction="top"
                :options="patientsFetchedData"
                :multiple="false"
                :searchable="true"
                :loading="isBusy"
                :internal-search="false"
                :clear-on-select="true"
                :close-on-select="true"
                :options-limit="300"
                :limit="10"
                :max-height="600"
                :show-no-results="false"
                :hide-selected="true"
                @search-change="fetchPatients"
              ></multiselect>
            </div>
            <!-- end userId -->
          </div>
          <div class="col-12">
            <!-- alert -->
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
            <!-- end alert -->
          </div>
        </div>
      </form>
      <template #modal-footer>
        <b-button variant="secondary" @click="resetModal()" class="float-right">
          Batal
        </b-button>
        <b-button
          variant="primary"
          type="submit"
          :disabled="isButtonSubmitDisable"
          class="float-right"
          form="doctor-form"
        >
          Simpan
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
