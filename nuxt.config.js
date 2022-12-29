import webpack from "webpack";

export default {
  server: {
    host: "0", // default: localhost,
    port: 3001,
  },
  // loading: "~/components/loading.vue",
  loading: "~/components/Loading.vue",
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Responsive Bootstrap 5 Admin Dashboard",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  // router: {
  //   // linkExactActiveClass: 'active'
  // },
  router: {
    extendRoutes(routes) {
      routes.push({
        path: "/",
        component: "~/pages/index.vue",
      });
    },
    linkExactActiveClass: "active",
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/scss/app.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "~/plugins/fakeauth.js",
    "~/plugins/fireauth.js",
    "~/plugins/i18n.js",
    "~/plugins/simplebar.js",
    "~/plugins/vue-click-outside.js",
    "~/plugins/vue-apexcharts.js",
    "~/plugins/vuelidate.js",
    "~/plugins/vue-slidebar.js",
    "~/plugins/vue-lightbox.js",
    "~/plugins/vue-chartist.js",
    "~/plugins/vue-mask.js",
    "~/plugins/vue-googlemap.js",
    // "~/plugins/queue-voice.js",
    "~/plugins/api-token-request.js",
    "~/plugins/typing.js",
    "~/plugins/upload.js",
    "~/plugins/authcheck.js",
    { src: "~/plugins/forward-set-cookie", mode: "server" },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  // components: true,
  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/dotenv", "@nuxtjs/moment"],
  moment: {
    // defaultLocale: "id",
    // locales: ["id"],
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://github.com/nuxt/content
    "@nuxt/content",
  ],
  auth: {
    redirect: {
      home: "/",
      login: "/auth/signin",
      logout: "/auth/signin",
    },
    watchLoggedIn: true,
    strategies: {
      local: {
        scheme: "~/schemes/customScheme",
        endpoints: {
          login: {
            url: `${process.env.API_URL}/api/sign/in`,
            method: "post",
            withCredentials: true,
          },
          user: {
            url: `${process.env.API_URL}/api/user/me`,
            method: "get",
            propertyName: "data",
            withCredentials: true,
            autoFetch: true,
          },
          logout: {
            url: `${process.env.API_URL}/api/sign/out`,
            method: "post",
            withCredentials: true,
          },
        },
        tokenRequired: false,
        tokenType: false,
      },
    },
  },
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      });
    },
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: "lodash",
      }),
    ],
  },
  env: {
    auth: process.env.VUE_APP_DEFAULT_AUTH,
    apikey: process.env.VUE_APP_APIKEY,
    authdomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseurl: process.env.VUE_APP_DATABASEURL,
    projectid: process.env.VUE_APP_PROJECTId,
    storgebucket: process.env.VUE_APP_STORAGEBUCKET,
    message: process.env.VUE_APP_MESSAGINGSENDERID,
    appid: process.env.VUE_APP_APPId,
    measurement: process.env.VUE_APP_MEASUREMENTID,
  },
  publicRuntimeConfig: {
    patientReadmissionDayLimit: process.env.PATIENT_RADMISSION_DAY_LIMIT || "-",
    dataSetTimeoutLimitMs: process.env.DATA_SETTIMEOUT_LIMIT_MS || 1000,
    debounceSetTimeoutLimitMs: process.env.DEBOUNCE_SETTIMEOUT_LIMIT_MS || 500,
  },
};
