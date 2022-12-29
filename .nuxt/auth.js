import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { default as Scheme$c50d } from '/Users/heiho/Development/DITA/fe-admin/schemes/customScheme.js'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/auth/signin",
    "logout": "/auth/signin",
    "home": "/",
    "callback": "/login"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": {
    "prefix": "auth."
  },
  "defaultStrategy": "local"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // local
  $auth.registerStrategy('local', new Scheme$c50d($auth, {
  "endpoints": {
    "login": {
      "url": "http://localhost:8085/api/sign/in",
      "method": "post",
      "withCredentials": true
    },
    "user": {
      "url": "http://localhost:8085/api/user/me",
      "method": "get",
      "propertyName": "data",
      "withCredentials": true,
      "autoFetch": true
    },
    "logout": {
      "url": "http://localhost:8085/api/sign/out",
      "method": "post",
      "withCredentials": true
    }
  },
  "tokenRequired": false,
  "tokenType": false,
  "name": "local"
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
