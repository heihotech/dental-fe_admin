import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5728c350 = () => interopDefault(import('../pages/bills.vue' /* webpackChunkName: "pages/bills" */))
const _6d3ece9c = () => interopDefault(import('../pages/patients.vue' /* webpackChunkName: "pages/patients" */))
const _62a8742b = () => interopDefault(import('../pages/recapitulations.vue' /* webpackChunkName: "pages/recapitulations" */))
const _01483e4b = () => interopDefault(import('../pages/reservations.vue' /* webpackChunkName: "pages/reservations" */))
const _6e80c6af = () => interopDefault(import('../pages/account/forgot-password.vue' /* webpackChunkName: "pages/account/forgot-password" */))
const _3e476093 = () => interopDefault(import('../pages/account/login.vue' /* webpackChunkName: "pages/account/login" */))
const _8a5ccad4 = () => interopDefault(import('../pages/account/profile/index.vue' /* webpackChunkName: "pages/account/profile/index" */))
const _32908b69 = () => interopDefault(import('../pages/account/register.vue' /* webpackChunkName: "pages/account/register" */))
const _38b8f145 = () => interopDefault(import('../pages/auth/forgot-password/index.vue' /* webpackChunkName: "pages/auth/forgot-password/index" */))
const _4cbb60ea = () => interopDefault(import('../pages/auth/lock-screen.vue' /* webpackChunkName: "pages/auth/lock-screen" */))
const _ab3ffbec = () => interopDefault(import('../pages/auth/login-1.vue' /* webpackChunkName: "pages/auth/login-1" */))
const _28b0ec2c = () => interopDefault(import('../pages/auth/recoverpwd.vue' /* webpackChunkName: "pages/auth/recoverpwd" */))
const _3f89615a = () => interopDefault(import('../pages/auth/register-1.vue' /* webpackChunkName: "pages/auth/register-1" */))
const _33f3a438 = () => interopDefault(import('../pages/auth/signin/index.vue' /* webpackChunkName: "pages/auth/signin/index" */))
const _8bde6ba4 = () => interopDefault(import('../pages/auth/signup/index.vue' /* webpackChunkName: "pages/auth/signup/index" */))
const _3821df31 = () => interopDefault(import('../pages/auth/verification/index.vue' /* webpackChunkName: "pages/auth/verification/index" */))
const _0d56a0be = () => interopDefault(import('../pages/utility/404.vue' /* webpackChunkName: "pages/utility/404" */))
const _36d336de = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _2563ddd0 = () => interopDefault(import('~/pages/index.vue' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/bills",
    component: _5728c350,
    name: "bills"
  }, {
    path: "/patients",
    component: _6d3ece9c,
    name: "patients"
  }, {
    path: "/recapitulations",
    component: _62a8742b,
    name: "recapitulations"
  }, {
    path: "/reservations",
    component: _01483e4b,
    name: "reservations"
  }, {
    path: "/account/forgot-password",
    component: _6e80c6af,
    name: "account-forgot-password"
  }, {
    path: "/account/login",
    component: _3e476093,
    name: "account-login"
  }, {
    path: "/account/profile",
    component: _8a5ccad4,
    name: "account-profile"
  }, {
    path: "/account/register",
    component: _32908b69,
    name: "account-register"
  }, {
    path: "/auth/forgot-password",
    component: _38b8f145,
    name: "auth-forgot-password"
  }, {
    path: "/auth/lock-screen",
    component: _4cbb60ea,
    name: "auth-lock-screen"
  }, {
    path: "/auth/login-1",
    component: _ab3ffbec,
    name: "auth-login-1"
  }, {
    path: "/auth/recoverpwd",
    component: _28b0ec2c,
    name: "auth-recoverpwd"
  }, {
    path: "/auth/register-1",
    component: _3f89615a,
    name: "auth-register-1"
  }, {
    path: "/auth/signin",
    component: _33f3a438,
    name: "auth-signin"
  }, {
    path: "/auth/signup",
    component: _8bde6ba4,
    name: "auth-signup"
  }, {
    path: "/auth/verification",
    component: _3821df31,
    name: "auth-verification"
  }, {
    path: "/utility/404",
    component: _0d56a0be,
    name: "utility-404"
  }, {
    path: "/",
    component: _36d336de,
    name: "index"
  }, {
    path: "/",
    component: _2563ddd0
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
