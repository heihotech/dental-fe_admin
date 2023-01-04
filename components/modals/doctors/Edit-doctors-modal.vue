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
      doctor: {
        specialist: null,
        userId: null,
        code: null,
      },
      //
      dismissSecs: 5,
      dismissCountDown: 0,
      err: null,
      variant: "danger",
      //
      userName: null,
      selectedUser: null,
      usersFetchedData: [],
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
      const url = "/api/doctors/" + parseInt(this.id);

      try {
        const resp = await this.$axios.patch(url, this.doctor);

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

    async fetchRoles() {
      this.isBusy = true;
      let url = "/api/roles?name=doctor";

      try {
        const resp = await this.$axios.get(url);

        if (resp.data) {
          this.roles = resp.data.data;
        }
      } catch (error) {
        console.log(error);
      }
      this.isBusy = false;
    },
    async fetchUsers(name) {
      this.isBusy = true;

      let url =
        "/api/users?page=1&size=10&order=createdAt%3Adesc&withRoles=true&withProfile=true&includeDeleted=true";

      if (this.roles.length > 0) {
        this.roles.map((el) => {
          url = url + "&roleIds[]=" + el.guid;
        });
      }

      if (name.length >= 3) {
        url = url + "&fullName=" + name;
      }

      try {
        const resp = await this.$axios.get(url);

        if (resp.data) {
          this.usersFetchedData = [];
          if (resp.data.data.length > 0) {
            resp.data.data.map((el) => {
              this.usersFetchedData.push({
                value: el.id,
                name: `${
                  el.profile.frontTitle ? el.profile.frontTitle + " " : ""
                }${el.profile.fullName ? el.profile.fullName + " " : ""}${
                  el.profile.endTitle ? el.profile.endTitle : ""
                }`,
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
    selectedUser: {
      handler: function () {
        this.doctor.userId = parseInt(this.selectedUser.value);
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
      "/api/doctors/" +
      this.id +
      "?withUser=true&withAddress=true&includeDeleted=true";
    try {
      const resp = await this.$axios.get(url);

      if (resp.data) {
        // begin doctor
        if (resp.data.data) {
          for (const key in resp.data.data) {
            if (
              resp.data.data.hasOwnProperty(key) &&
              this.doctor.hasOwnProperty(key)
            ) {
              this.doctor[key] = resp.data.data[key];
            }

            if (key === "userId") {
              const respUser = await this.$axios.get(
                `/api/users/${resp.data.data[key]}?withProfile=true`
              );

              this.selectedUser = {
                value: parseInt(respUser.data.data.id),
                name: `${
                  respUser.data.data.profile.frontTitle
                    ? respUser.data.data.profile.frontTitle + " "
                    : ""
                }${
                  respUser.data.data.profile.fullName
                    ? respUser.data.data.profile.fullName + " "
                    : ""
                }${
                  respUser.data.data.profile.endTitle
                    ? respUser.data.data.profile.endTitle
                    : ""
                }`,
              };
            }
          }
        }
        // end doctor
      }
    } catch (error) {}

    console.log("fetched at: " + this.$fetchState.timestamp);
    this.isBusy = false;
  },
  async created() {
    await this.fetchRoles();
  },
};
</script>

<template>
  <div>
    <b-modal
      v-model="isModalActive"
      scrollable
      title="Edit Dokter"
      title-class="font-18"
      size="md"
      @close="resetModal"
      @hide="resetModal"
    >
      <form @submit.prevent="submit" id="doctor-form">
        <div class="row">
          <div class="col-sm-12">
            <!-- specialist -->
            <div class="mb-3">
              <label for="specialist">Spesialis</label>
              <input
                required
                v-model="doctor.specialist"
                type="text"
                class="form-control"
                id="specialist"
                placeholder="Masukkan Spesialis"
              />
            </div>
            <!-- end specialist -->
            <!-- userId -->
            <div class="mb-3">
              <label for="village">Nama Dokter</label>
              <multiselect
                v-model="selectedUser"
                id="ajax"
                label="name"
                track-by="name"
                placeholder="Ketikkan nama desa untuk mencari"
                open-direction="top"
                :options="usersFetchedData"
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
                @search-change="fetchUsers"
              ></multiselect>
            </div>
            <!-- end userId -->
            <!-- code -->
            <div class="mb-3">
              <label for="code">Kode</label>
              <input
                required
                v-model="doctor.code"
                type="text"
                class="form-control"
                id="code"
                placeholder="Masukkan Kode"
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
