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
      doctor: {
        specialist: null,
        userId: null,
        code: null,
      },
      //
      user: {
        profileId: null,
      },
      //
      profile: {
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
      const url = "/api/doctors/" + this.id + "/restore";

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
    let url =
      "/api/doctors/" + this.id + "?withProfile=true&includeDeleted=true";
    try {
      const resp = await this.$axios.get(url);

      if (resp.data) {
        // begin doctor
        if (resp?.data?.data) {
          for (const key in resp?.data?.data) {
            if (
              resp?.data?.data?.hasOwnProperty(key) &&
              this.doctor.hasOwnProperty(key)
            ) {
              this.doctor[key] = resp.data.data[key];
            }
          }
        }
        // end doctor
        // begin user
        if (resp?.data?.data?.user) {
          for (const key in resp?.data?.data?.user) {
            if (
              resp?.data?.data?.user?.hasOwnProperty(key) &&
              this.user.hasOwnProperty(key)
            ) {
              this.user[key] = resp.data.data.user[key];
            }
          }
        }
        // end user
        // begin profile
        if (resp?.data?.data?.user?.profile) {
          for (const key in resp?.data?.data?.user?.profile) {
            if (
              resp?.data?.data?.user?.profile?.hasOwnProperty(key) &&
              this.profile.hasOwnProperty(key)
            ) {
              this.profile[key] = resp.data.data.user.profile[key];
            }
          }
        }
        // end user
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
      title="Restore Dokter Terdaftar"
      title-class="font-18"
      @close="resetModal"
      @hide="resetModal"
    >
      <p v-if="profile.fullName" class="text-center">
        Apakah anda yakin mengembalikan
        <b>{{ profile.fullName }}</b
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
