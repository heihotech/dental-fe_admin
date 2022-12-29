<script>
import axios from "@nuxtjs/axios";

export default {
  components: {},
  layout: "auth",
  head() {
    return {
      title: `${this.title} | RSUD Majenang`,
    };
  },
  data() {
    return {
      title: "Daftar",
      username: "",
      email: "",
      phone: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      isBusy: false,
      usernameError: null,
      emailError: null,
      phoneError: null,
      usernameAvailable: true,
      emailAvailable: null,
      phoneAvailable: null,
      isUsernameNotAvailable: null,
      isEmailNotAvailable: null,
      isPhoneNotAvailable: null,
      fullNameError: null,
      passwordError: null,
      confirmPasswordError: null,
      usernameRegex: /[^a-zA-Z0-9_.]/,
      emailRegex: /[^a-zA-Z0-9_.@]/,
      phoneRegex: /[^0-9]/,
      fullNameRegex: /[^a-zA-Z ]/,
      //
      isModalSMSVerificationActive: false,
      //
      dismissSecs: 5,
      dismissCountDown: 0,
      err: null,
      variant: "danger",
      //
      userId: null,
    };
  },
  computed: {
    isButtonSubmitDisable() {
      if (
        this.usernameError !== null ||
        this.emailError !== null ||
        this.phoneError !== null ||
        this.fullNameError !== null ||
        this.passwordError !== null
      ) {
        return true;
      }
      if (this.isBusy === true) {
        return true;
      }

      return false;
    },
  },
  watch: {
    username: {
      handler: async function () {
        if (
          this.usernameRegex.exec(this.username) !== null ||
          this.username.length <= 8
        ) {
          this.usernameError = `Minimal 8 karakter alphanumerik, ".", "_" dan "@"`;
        } else {
          this.usernameAvailable = !(await this.checkIsNotAvailable(
            "username",
            this.username
          ));

          if (this.usernameAvailable === true) {
            this.usernameError = null;
          }
        }
      },
    },
    email: {
      handler: async function () {
        if (
          this.emailRegex.exec(this.email) !== null ||
          this.email.length <= 13
        ) {
          this.emailError = `Minimal 13 karakter alphanumerik, ".", "_" dan "@"`;
        } else {
          this.emailAvailable = !(await this.checkIsNotAvailable(
            "email",
            this.email
          ));

          if (this.emailAvailable === true) {
            this.emailError = null;
          }
        }
      },
    },
    phone: {
      handler: async function () {
        if (
          this.phoneRegex.exec(this.phone) !== null ||
          this.phone.length <= 10
        ) {
          this.phoneError = `Minimal 11 karakter numerik`;
        } else {
          this.phoneAvailable = !(await this.checkIsNotAvailable(
            "phone",
            this.phone
          ));

          if (this.phoneAvailable === true) {
            this.phoneError = null;
          }
        }
      },
    },
    fullName: {
      handler: function () {
        if (
          this.fullNameRegex.exec(this.fullName) !== null ||
          this.fullName.length <= 3
        ) {
          this.fullNameError = `Minimal 3 karakter alphabet`;
        } else {
          this.fullNameError = null;
        }
      },
    },
    password: {
      handler: function () {
        if (this.password.length < 8) {
          this.passwordError = `Minimal 8 karakter`;
        } else {
          this.passwordError = null;
        }
      },
    },
    confirmPassword: {
      handler: function () {
        if (this.confirmPassword !== this.password) {
          this.confirmPasswordError = `Kata sandi tidak cocok`;
        } else {
          this.confirmPasswordError = null;
        }
      },
    },
  },
  methods: {
    async checkIsNotAvailable(attribute, value) {
      let url = process.env.API_URL + "/api/users/check/";
      let message = "";

      switch (attribute) {
        case "email":
          url = url + "email";
          message = "Email telah digunakan!";
          break;
        case "phone":
          url = url + "phone";
          message = "No. Telepon telah digunakan!";
          break;
        case "username":
          url = url + "username";
          message = "Nama Pengguna telah digunakan!";
          break;

        default:
          break;
      }

      try {
        const resp = await this.$apiTokenRequest.post(url, {
          [attribute]: value,
        });

        if (resp.data.data.exists === true) {
          this[`${attribute}Error`] = message;
        }

        return resp.data.data.exists;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async submit() {
      const url = "/api/sign/up";

      this.isBusy = true;

      try {
        const resp = await this.$apiTokenRequest.post(url, {
          username: this.username,
          email: this.email,
          phone: this.phone,
          fullName: this.fullName,
          password: this.password,
        });
        if (resp.data) {
          this.userId = resp.data.data.guid;

          this.isModalSMSVerificationActive =
            !this.isModalSMSVerificationActive;
        }
      } catch (error) {
        this.showAlert("Terjadi kesalahan!", "danger");
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
  created() {
    if (this.$auth.loggedIn === true) {
      this.$router.go(-1);
    }
  },
};
</script>

<template>
  <div>
    <!-- modal -->
    <signup-sms-verification-modal
      v-if="isModalSMSVerificationActive"
      :guid="userId"
      @close="
        () => {
          isModalSMSVerificationActive = !isModalSMSVerificationActive;
          $router.push({
            path: '/auth/signin',
          });
        }
      "
    />

    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <nuxt-link to="/" class="mb-5 d-block auth-logo">
                <img
                  src="~/assets/images/logo-dark.png"
                  alt=""
                  height="22"
                  class="logo logo-dark"
                />
                <img
                  src="~/assets/images/logo-light.png"
                  alt=""
                  height="22"
                  class="logo logo-light"
                />
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Selamat Datang</h5>
                  <p class="text-muted">
                    Silahkan lengkapi formulir berikut untuk mendaftar
                  </p>
                </div>
                <div class="p-2 mt-4">
                  <form @submit.prevent="submit()">
                    <!-- fullName -->
                    <div class="mb-3">
                      <label for="fullName">Nama Lengkap</label>
                      <input
                        required
                        v-model="fullName"
                        type="text"
                        class="form-control"
                        id="fullName"
                        placeholder="Masukkan Nama Lengkap"
                        :class="{
                          'is-invalid': fullNameError !== null,
                        }"
                      />
                      <div
                        v-if="fullNameError !== null"
                        class="invalid-feedback"
                      >
                        <span v-if="fullNameError !== null">{{
                          fullNameError
                        }}</span>
                      </div>
                    </div>
                    <!-- end fullName -->
                    <!-- email -->
                    <div class="mb-3">
                      <label for="email">Email</label>
                      <input
                        required
                        v-model="email"
                        type="text"
                        class="form-control"
                        id="email"
                        placeholder="Masukkan Email"
                        :class="{
                          'is-invalid': emailError !== null,
                          'is-valid':
                            emailAvailable === true && email.length > 0,
                        }"
                        debounce="500"
                      />
                      <div v-if="emailError !== null" class="invalid-feedback">
                        <span v-if="emailError !== null">{{ emailError }}</span>
                      </div>
                      <div
                        v-if="
                          emailAvailable === true &&
                          email.length > 0 &&
                          emailError === null
                        "
                        class="valid-feedback"
                      >
                        <span v-if="emailAvailable === true"
                          >Email tersedia</span
                        >
                      </div>
                    </div>
                    <!-- end email -->
                    <!-- username -->
                    <div class="mb-3">
                      <label for="username">Nama Pengguna</label>
                      <input
                        required
                        v-model="username"
                        type="text"
                        class="form-control"
                        id="username"
                        placeholder="Masukkan Nama Pengguna"
                        :class="{
                          'is-invalid': usernameError !== null,
                          'is-valid':
                            usernameAvailable === true && username.length > 0,
                        }"
                        debounce="500"
                      />
                      <div
                        v-if="usernameError !== null"
                        class="invalid-feedback"
                      >
                        <span v-if="usernameError !== null">{{
                          usernameError
                        }}</span>
                      </div>
                      <div
                        v-if="
                          usernameAvailable === true &&
                          username.length > 0 &&
                          usernameError === null
                        "
                        class="valid-feedback"
                      >
                        <span v-if="usernameAvailable === true"
                          >Nama Pengguna tersedia</span
                        >
                      </div>
                    </div>
                    <!-- end username -->
                    <!-- phone -->
                    <div class="mb-3">
                      <label for="phone">No. Telepon</label>
                      <input
                        required
                        v-model="phone"
                        type="text"
                        class="form-control"
                        id="phone"
                        placeholder="Masukkan No. Telepon"
                        :class="{
                          'is-invalid': phoneError !== null,
                          'is-valid':
                            phoneAvailable === true && phone.length > 0,
                        }"
                        debounce="500"
                      />
                      <div v-if="phoneError !== null" class="invalid-feedback">
                        <span v-if="phoneError !== null">{{ phoneError }}</span>
                      </div>
                      <div
                        v-if="
                          phoneAvailable === true &&
                          phone.length > 0 &&
                          phoneError === null
                        "
                        class="valid-feedback"
                      >
                        <span v-if="phoneAvailable === true"
                          >No. Telepon tersedia</span
                        >
                      </div>
                    </div>
                    <!-- end phone -->

                    <div class="mb-3">
                      <div class="float-end"></div>
                      <label for="userpassword">Kata Sandi</label>
                      <input
                        required
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="userpassword"
                        placeholder="Masukkan Kata Sandi"
                        :class="{
                          'is-invalid': passwordError !== null,
                        }"
                      />
                      <div
                        v-if="passwordError !== null"
                        class="invalid-feedback"
                      >
                        <span v-if="passwordError !== null">{{
                          passwordError
                        }}</span>
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="float-end"></div>
                      <label for="userConfirmPassword"
                        >Konfirmasi Kata Sandi</label
                      >
                      <input
                        v-model="confirmPassword"
                        type="password"
                        class="form-control"
                        id="userConfirmPassword"
                        placeholder="Masukkan Kata Sandi"
                        :class="{
                          'is-invalid': confirmPasswordError !== null,
                        }"
                      />
                      <div
                        v-if="confirmPasswordError !== null"
                        class="invalid-feedback"
                      >
                        <span v-if="confirmPasswordError !== null">{{
                          confirmPasswordError
                        }}</span>
                      </div>
                    </div>

                    <div class="">
                      <b-alert
                        :show="dismissCountDown"
                        dismissible
                        :variant="variant"
                        @dismissed="dismissCountDown = 0"
                        @dismiss-count-down="countDownChanged"
                      >
                        {{ err }}
                      </b-alert>
                    </div>

                    <div class="mt-3 text-end">
                      <button
                        class="btn btn-primary w-sm waves-effect waves-light"
                        type="submit"
                        :disabled="isButtonSubmitDisable"
                      >
                        Daftar
                      </button>
                    </div>

                    <div class="mt-4 text-center">
                      <p class="mb-0">
                        Sudah memiliki akun?
                        <nuxt-link
                          to="/auth/signin"
                          class="fw-medium text-primary"
                        >
                          Masuk</nuxt-link
                        >
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="mt-5 text-center">
              <p>
                © {{ new Date().getFullYear() }} BLUD RSUD Majenang. Crafted
                with <i class="mdi mdi-heart text-danger"></i> by
                <a
                  href="https://github.com/heihotech"
                  target="_blank"
                  class="text-reset"
                  >Heiho</a
                >
              </p>
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
  </div>
</template>
