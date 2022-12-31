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
      patient: {
        phoneNumber: null,
        email: null,
        fullName: null,
        nik: null,
        gender: "M",
        religion: null,
        birthDate: null,
        avatarUrl: null,
        isIndonesian: true,
        addressId: null,
      },
      //
      address: {
        location: null,
        villageId: null,
        phone: null,
        zipCode: null,
        latitude: null,
        longitude: null,
        village: null,
      },
      //
      dismissSecs: 5,
      dismissCountDown: 0,
      err: null,
      variant: "danger",
      //
      villageName: null,
      selectedVillage: null,
      villagesFetchedData: [],
    };
  },
  methods: {
    async fetchVillages(name) {
      this.isBusy = true;
      let url =
        "/api/villages?page=1&size=10&order=createdAt%3Adesc&withDistrict=true";

      if (name.length >= 3) {
        let newName = name.split(" ");

        url = url + "&name=" + newName[0];

        if (newName[1] && newName[1].length > 2) {
          url = url + "&districtName=" + newName[1];
        }
        if (newName[2] && newName[2].length > 2) {
          url = url + "&cityName=" + newName[2];
        }
        if (newName[3] && newName[3].length > 2) {
          url = url + "&provinceName=" + newName[3];
        }
      }

      try {
        const resp = await this.$axios.get(url);

        if (resp.data) {
          this.villagesFetchedData = [];
          if (resp.data.data.length > 0) {
            resp.data.data.map((el) => {
              this.villagesFetchedData.push({
                value: el.id,
                // name: el.name,
                name: `${el.name}, ${el.district.name}, ${el.district.city.name}, ${el.district.city.province.name} `,
              });
            });
          }
        }
      } catch (error) {}

      this.isBusy = false;
    },
    async createOrUpdateAddress() {
      this.isBusy = true;
      let url = "/api/addresses/";

      if (this.patient.addressId !== null) {
        url = url + parseInt(this.patient.addressId);
      }

      try {
        if (this.patient.addressId !== null) {
          await this.$axios.patch(url, this.address);
        } else {
          const resp = await this.$axios.post(url, this.address);

          if (resp.data.data) {
            this.patient.addressId = resp.data.data.id;
          }
        }
      } catch (error) {
        this.showAlert(
          `${error.response.status || 500}: ${
            error.response.data.error || "Terjadi kesalahan!"
          }`,
          "danger"
        );
        console.log(error);
      }

      this.isBusy = false;
    },
    resetModal() {
      this.$emit("close");
      this.isModalActive = !this.isModalActive;
    },
    async submit() {
      this.isBusy = true;
      const url = "/api/patients/" + this.id;

      try {
        await this.createOrUpdateAddress();
        const resp = await this.$axios.patch(url, this.patient);

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
  watch: {
    selectedVillage: {
      handler: function () {
        this.address.villageId = parseInt(this.selectedVillage.value);
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
  async created() {},
  async fetch() {
    this.isBusy = true;
    let url =
      "/api/patients/" + this.id + "?includeDeleted=true&withAddress=true";
    try {
      const resp = await this.$axios.get(url);

      if (resp.data) {
        // begin patient
        if (resp?.data?.data) {
          for (const key in resp?.data?.data) {
            if (
              resp?.data?.data?.hasOwnProperty(key) &&
              this.patient.hasOwnProperty(key)
            ) {
              this.patient[key] = resp.data.data[key];
            }
          }
        }
        // end patient
        // begin address
        if (resp.data.data.address) {
          for (const key in resp.data.data.address) {
            if (
              resp.data.data.address.hasOwnProperty(key) &&
              this.address.hasOwnProperty(key)
            ) {
              this.address[key] = resp.data.data.address[key];
            }
            //
            if (key === "villageId") {
              const respVillage = await this.$axios.get(
                `/api/villages/${resp.data.data.address[key]}?withDistrict=true`
              );

              this.selectedVillage = {
                value: parseInt(respVillage.data.data.id),
                name: `${respVillage.data.data.name}, ${respVillage.data.data.district.name}, ${respVillage.data.data.district.city.name}, ${respVillage.data.data.district.city.province.name} `,
              };
            }
          }
        }
        // end address
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
      title="Edit Pasien"
      title-class="font-18"
      size="md"
      @close="resetModal"
      @hide="resetModal"
    >
      <form @submit.prevent="submit" id="clinic-state">
        <div class="row">
          <div class="col-sm-12">
            <!-- fullName -->
            <div class="mb-3">
              <label for="fullName">Nama Lengkap</label>
              <input
                required
                v-model="patient.fullName"
                type="text"
                class="form-control"
                id="fullName"
                placeholder="Masukkan nama"
              />
            </div>
            <!-- end fullName -->
            <!-- nik -->
            <div class="mb-3">
              <label for="nik">NIK</label>
              <input
                required
                v-model="patient.nik"
                type="number"
                class="form-control"
                id="nik"
                placeholder="Masukkan NIK"
              />
            </div>
            <!-- end nik -->
            <!-- phoneNumber -->
            <div class="mb-3">
              <label for="phoneNumber">No. Telepon</label>
              <input
                required
                v-model="patient.phoneNumber"
                type="number"
                class="form-control"
                id="phoneNumber"
                placeholder="Masukkan No. Telepon"
              />
            </div>
            <!-- end phoneNumber -->
            <!-- gender -->
            <div class="mb-3">
              <label for="gender">Jenis Kelamin</label>
              <select
                class="form-control"
                name="gender"
                id="gender"
                required
                v-model="patient.gender"
              >
                <option value="M">Laki-laki</option>
                <option value="F">Perempuan</option>
              </select>
            </div>
            <!-- end gender -->
            <!-- religion -->
            <div class="mb-3">
              <label for="religion">Agama</label>
              <select
                class="form-control"
                name="religion"
                id="religion"
                v-model="patient.religion"
              >
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Budha">Budha</option>
                <option value="Penghayat Kepercayaan">
                  Penghayat Kepercayaan
                </option>
              </select>
            </div>
            <!-- end religion -->
            <!-- birthDate -->
            <div class="mb-3">
              <label for="birthDate">Tanggal Lahir</label>
              <b-form-datepicker
                class="form-control"
                name="birthDate"
                id="birthDate"
                v-model="patient.birthDate"
                required
                locale="id"
                placeholder=""
              ></b-form-datepicker>
            </div>
            <!-- end birthDate -->
            <!-- villageId -->
            <div class="mb-3">
              <label for="village">Desa / Kelurahan</label>
              <multiselect
                v-model="selectedVillage"
                id="ajax"
                label="name"
                track-by="name"
                placeholder="Ketikkan nama desa untuk mencari"
                open-direction="bottom"
                :options="villagesFetchedData"
                :multiple="false"
                :searchable="true"
                :loading="isBusy"
                :internal-search="false"
                :clear-on-select="true"
                :close-on-select="true"
                :options-limit="100"
                :limit="10"
                :max-height="600"
                :show-no-results="true"
                :hide-selected="false"
                @search-change="fetchVillages"
              ></multiselect>
            </div>
            <!-- end villageId -->
            <!-- location -->
            <div class="mb-3">
              <label for="nip">Alamat</label>
              <b-textarea v-model="address.location" />
            </div>
            <!-- end location -->
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
          form="clinic-state"
        >
          Simpan
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
