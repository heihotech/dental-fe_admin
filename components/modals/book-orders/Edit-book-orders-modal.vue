<script>
import Multiselect from "vue-multiselect";
export default {
  components: { Multiselect },
  props: {
    //     id: {
    //       required: true,
    //       type: Number,
    //     },
  },
  data() {
    return {
      isModalActive: true,
      isBusy: false,
      //
      bookOrder: {
        patientId: null,
        doctorId: null,
        scheduleId: null,
        arrivalPlan: null,
        arrivalEstimation: null,
        arrival: new Date(),
        patientComplaint: null,
        diagnose: null,
        therapy: null,
        cost: null,
        fullName: null,
        phoneNumber: null,
        complaint: null,
      },
      //
      dismissSecs: 5,
      dismissCountDown: 0,
      err: null,
      variant: "danger",
      //
      selectedDoctor: null,
      doctorsFetchedData: [],
      //
      selectedPatient: null,
      patientsFetchedData: [],
      //
      selectedSchedule: null,
      schedulesFetchedData: [],
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
      const url = "/api/book-orders/";

      try {
        const resp = await this.$axios.post(url, this.bookOrder);

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
    async fetchDoctors(name) {
      this.isBusy = true;

      let url =
        "/api/doctors?page=1&size=10&order=createdAt%3Adesc&withProfile=true&withSchedules=true";

      if (name.length >= 3) {
        url = url + "&fullName=" + name;
      }

      try {
        const resp = await this.$axios.get(url);

        if (resp.data) {
          this.doctorsFetchedData = [];
          if (resp.data.data.length > 0) {
            resp.data.data.map((el) => {
              this.doctorsFetchedData.push({
                value: el.id,
                name: `${
                  el.user.profile.fullName ? el.user.profile.fullName + " " : ""
                }`,
                schedules: el.schedules,
              });
            });
          }
        }
      } catch (error) {}

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
    switchSchedule(arr) {
      let schedules = [];
      arr.map((s) => {
        if (s.day === parseInt(new Date().getDay())) {
          schedules.push({
            value: s.id,
            text: s.time,
          });
        }
      });
      return schedules;
    },
  },
  watch: {
    selectedDoctor: {
      handler: function () {
        this.schedulesFetchedData = [];
        this.selectedSchedule = null;
        this.bookOrder.doctorId = parseInt(this.selectedDoctor.value);
        if (this.selectedDoctor !== null) {
          // this.schedulesFetchedData = this.selectedDoctor.schedules;
          this.schedulesFetchedData = this.switchSchedule(
            this.selectedDoctor.schedules
          );
        }
      },
    },
    selectedPatient: {
      handler: function () {
        if (this.selectedPatient !== null) {
          this.bookOrder.patientId = parseInt(this.selectedPatient.value);
          this.bookOrder.phoneNumber = this.selectedPatient.phoneNumber;
          this.bookOrder.fullName = this.selectedPatient.name;
        }
      },
    },
    selectedSchedule: {
      handler: function () {
        if (this.selectedSchedule !== null) {
          this.bookOrder.scheduleId = parseInt(this.selectedSchedule.value);
        }
      },
    },
  },
  computed: {
    isButtonSubmitDisable() {
      if (
        this.isBusy === true ||
        this.selectedSchedule === null ||
        this.selectedDoctor === null ||
        this.selectedPatient === null ||
        this.bookOrder.patientComplaint === null
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  async created() {},
};
</script>

<template>
  <div>
    <b-modal
      v-model="isModalActive"
      scrollable
      title="Edit Reservasi"
      title-class="font-18"
      size="md"
      @close="resetModal"
      @hide="resetModal"
    >
      <form @submit.prevent="submit" id="doctor-form">
        <div class="row">
          <div class="col-sm-12">
            <!-- doctorId -->
            <div class="mb-3">
              <label for="village">Nama Dokter</label>
              <multiselect
                v-model="selectedDoctor"
                id="ajax"
                label="name"
                track-by="name"
                placeholder="Ketikkan nama"
                open-direction="bottom"
                :options="doctorsFetchedData"
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
                @search-change="fetchDoctors"
              ></multiselect>
            </div>
            <!-- end doctorId -->
            <!-- patientId -->
            <div class="mb-3">
              <label for="village">Nama Pasien</label>
              <multiselect
                v-model="selectedPatient"
                id="ajax"
                label="name"
                track-by="name"
                placeholder="Ketikkan nama"
                open-direction="bottom"
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
            <!-- end patientId -->
            <!-- patientId -->
            <div class="mb-3">
              <label for="village">Jadwal Praktek</label>
              <multiselect
                v-model="selectedSchedule"
                open-direction="bottom"
                :options="schedulesFetchedData"
                label="text"
                :multiple="false"
                :searchable="false"
                :loading="isBusy"
                :internal-search="false"
                :clear-on-select="true"
                :close-on-select="true"
                :options-limit="300"
                :limit="10"
                :max-height="600"
                :show-no-results="false"
                :hide-selected="true"
              ></multiselect>
            </div>
            <!-- end patientId -->
            <!-- code -->
            <div class="mb-3">
              <label for="code">Keluhan</label>
              <textarea
                required
                v-model="bookOrder.patientComplaint"
                type="text"
                class="form-control"
              />
            </div>
            <!-- end code -->
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
