<script>
/**
 * Login-1 component
 */
export default {
  layout: "auth",
  head() {
    return {
      title: `${this.title} | RSUD Majenang`,
    };
  },
  data() {
    return {
      title: "Masuk",
      identifier: "",
      password: "",
      isBusy: false,
      errorMessage: null,
      identifierRegex: /[^a-zA-Z0-9_.@]/,
      identifierError: null,
      userId: null,
      //
      dismissSecs: 5,
      dismissCountDown: 0,
      err: null,
      variant: "danger",
    };
  },
  computed: {
    isButtonSubmitDisable() {
      if (this.identifierError !== null) {
        return true;
      }
      if (this.isBusy === true) {
        return true;
      }

      return false;
    },
  },
  watch: {
    identifier: {
      handler: function () {
        if (
          this.identifierRegex.exec(this.identifier) !== null ||
          this.identifier.length <= 8
        ) {
          this.identifierError = `Minimal 8 karakter alphanumerik, ".", "_" dan "@"`;
        } else {
          this.identifierError = null;
        }
      },
    },
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
    async login() {
      this.isBusy = true;
      try {
        const resp = await this.$auth.loginWith("local", {
          data: {
            identifierVar: this.identifier,
            password: this.password,
          },
          headers: {
            authorization: `Bearer ${process.env.API_TOKEN}`,
          },
        });

        if (resp.data.data) {
          this.$auth.strategy.token.set(resp.headers["x-app-token"]);

          await this.$auth.fetchUser();

          if (this.$auth.loggedIn) {
            this.$router.push({
              path: "/",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
      this.isBusy = false;
    },
    // async submit() {
    //   const url = "/api/sign/in";

    //   this.isBusy = true;

    //   try {
    //     const resp = await this.$apiTokenRequest.post(url, {
    //       identifierVar: this.identifier,
    //       password: this.password,
    //     });
    //     if (resp.data) {
    //       this.userId = resp.data.data.userId;

    //       await this.login();
    //     }
    //   } catch (error) {
    //     this.showAlert(
    //       `${error.response.status || 500}: ${
    //         error.response.data.error || "Terjadi kesalahan!"
    //       }`,
    //       "danger"
    //     );
    //   }
    //   this.isBusy = false;
    // },
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
                  <p class="text-muted">Silahkan masuk untuk melanjutkan</p>
                </div>
                <div class="p-2 mt-4">
                  <form @submit.prevent="login">
                    <div class="mb-3">
                      <label for="identifier"
                        >Nama Pengguna / Email / No. Telp.</label
                      >
                      <input
                        required
                        v-model="identifier"
                        type="text"
                        class="form-control"
                        id="identifier"
                        placeholder="Masukkan Nama Pengguna / Email / No. Telp."
                        :class="{
                          'is-invalid': identifierError !== null,
                        }"
                      />
                      <div
                        v-if="identifierError !== null"
                        class="invalid-feedback"
                      >
                        <span v-if="identifierError !== null">{{
                          identifierError
                        }}</span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <!-- <nuxt-link to="/auth/recoverpwd" class="text-muted">
                          Forgot password?</nuxt-link
                        > -->
                      </div>
                      <label for="userpassword">Kata Sandi</label>
                      <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="userpassword"
                        placeholder="Masukkan Kata Sandi"
                      />
                    </div>

                    <!-- <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="auth-remember-check"
                      />
                      <label class="form-check-label" for="auth-remember-check"
                        >Ingat saya</label
                      >
                    </div> -->

                    <div>
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
                        Masuk
                      </button>
                    </div>

                    <div class="mt-4 text-center">
                      <p class="mb-0">
                        Tidak memiliki akun?
                        <nuxt-link
                          to="/auth/signup"
                          class="fw-medium text-primary"
                        >
                          Daftar sekarang</nuxt-link
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
