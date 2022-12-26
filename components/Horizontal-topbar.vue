<script>
import { menuItems } from "./horizontal-menu";

import { layoutComputed, authFackMethods } from "~/store/helpers";

/**
 * Horizontal-topbar component
 */
export default {
  data() {
    return {
      menuItems: menuItems,
      languages: [
        {
          flag: require("~/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("~/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("~/assets/images/flags/spain.jpg"),
          language: "es",
          title: "spanish",
        },
        {
          flag: require("~/assets/images/flags/china.png"),
          language: "zh",
          title: "Chinese",
        },
        {
          flag: require("~/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      current_language: this.$i18n.locale,
      text: null,
      flag: null,
      value: null,
    };
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...layoutComputed,
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === this.$i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
    this.activateParentDropdown();

    this.$router.afterEach((routeTo, routeFrom) => {
      this.activateParentDropdown();
    });
  },
  methods: {
    ...authFackMethods,
    /**
     * remove active and mm-active class
     */
    _removeAllClass(className) {
      const els = document.getElementsByClassName(className);
      while (els[0]) {
        els[0].classList.remove(className);
      }
    },

    activateParentDropdown() {
      const resetParent = (el) => {
        const parent = el.parentElement;
        this._removeAllClass("mm-active");
        this._removeAllClass("mm-show");
        if (parent) {
          parent.classList.remove("active");
          const parent2 = parent.parentElement;
          if (parent2) {
            parent2.classList.remove("active");
            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.remove("active");
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.remove("active");
                const parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.remove("active");
                  const menuelement = document.getElementById(
                    "topnav-menu-content"
                  );
                  if (menuelement !== null)
                    if (menuelement.classList.contains("show"))
                      document
                        .getElementById("topnav-menu-content")
                        .classList.remove("show");
                }
              }
            }
          }
        }
      };
      var links = document.getElementsByClassName("side-nav-link-ref");
      var matchingMenuItem = null;
      for (let i = 0; i < links.length; i++) {
        // reset menu
        resetParent(links[i]);
      }
      for (var i = 0; i < links.length; i++) {
        if (window.location.pathname === links[i].pathname) {
          matchingMenuItem = links[i];
          break;
        }
      }
      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var parent = matchingMenuItem.parentElement;
        if (parent) {
          parent.classList.add("active");
          const parent2 = parent.parentElement;
          if (parent2) {
            parent2.classList.add("active");
          }
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add("active");
            var childAnchor = parent3.querySelector(".has-dropdown");
            if (childAnchor) childAnchor.classList.add("active");
          }

          const parent4 = parent3.parentElement;
          if (parent4) parent4.classList.add("active");
          const parent5 = parent4.parentElement;
          if (parent5) parent5.classList.add("active");
        }
      }
    },
    /**
     * Full-screen
     */
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    /**
     * Toggle right-sidebar
     */
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    /**
     * Menu clicked show the submenu
     */
    onMenuClick(event) {
      event.preventDefault();
      const nextEl = event.target.nextElementSibling;
      if (nextEl) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove("show");
        }
        nextEl.classList.toggle("show");
      }
      return false;
    },

    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    /**
     * Language set
     */
    setLanguage(locale, country, flag) {
      this.$i18n.locale = locale;
      this.current_language = locale;
      this.text = country;
      this.flag = flag;
    },
    toggleMenu() {
      let element = document.getElementById("topnav-menu-content");
      element.classList.toggle("show");
    },
    logoutUser() {
      this.logout();
      this.$router.push({
        path: "/account/login",
      });
    },
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-topbar", "dark");
              break;
            case "light":
              document.body.setAttribute("data-topbar", "light");
              document.body.removeAttribute("data-layout-size", "boxed");
              break;
            case "colored":
              document.body.setAttribute("data-topbar", "colored");
              document.body.removeAttribute("data-layout-size", "boxed");
              break;
            default:
              document.body.setAttribute("data-topbar", "dark");
              break;
          }
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-size", "boxed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "fluid");
              document.body.removeAttribute("data-layout-size");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      },
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <nuxt-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="~/assets/images/logo-sm.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="~/assets/images/logo-dark.png" alt height="20" />
            </span>
          </nuxt-link>

          <nuxt-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="~/assets/images/logo-sm.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="~/assets/images/logo-light.png" alt height="20" />
            </span>
          </nuxt-link>
        </div>

        <button
          type="button"
          class="btn btn-sm px-3 font-size-16 d-lg-none header-item"
          data-toggle="collapse"
          data-target="#topnav-menu-content"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex">
        <b-dropdown
          class="d-inline-block"
          toggle-class="header-item"
          right
          variant="white"
        >
          <template v-slot:button-content>
            <img
              class="rounded-circle header-profile-user"
              src="~/assets/images/users/avatar-4.jpg"
              alt="Header Avatar"
            />
            <span
              class="d-none d-xl-inline-block ms-1 fw-medium font-size-15"
              >{{ $t("navbar.dropdown.marcus.text") }}</span
            >
            <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
          </template>

          <!-- item-->
          <a class="dropdown-item" href="#">
            <i
              class="uil uil-user-circle font-size-18 align-middle text-muted me-1"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.profile")
            }}</span>
          </a>
          <a class="dropdown-item" href="#">
            <i
              class="uil uil-wallet font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.mywallet")
            }}</span>
          </a>
          <a class="dropdown-item d-block" href="#">
            <i
              class="uil uil-cog font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.settings")
            }}</span>
            <span class="badge bg-soft-success rounded-pill mt-1 ms-2">03</span>
          </a>
          <a class="dropdown-item" href="#">
            <i
              class="uil uil-lock-alt font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.lockscreen")
            }}</span>
          </a>
          <a
            class="dropdown-item"
            href="javascript: void(0);"
            @click="logoutUser"
          >
            <i
              class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.logout")
            }}</span>
          </a>
        </b-dropdown>
      </div>
    </div>
    <div class="container-fluid">
      <div class="topnav">
        <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
          <div class="collapse navbar-collapse" id="topnav-menu-content">
            <ul class="navbar-nav">
              <li
                class="nav-item dropdown"
                v-for="(item, index) of menuItems"
                :key="index"
              >
                <router-link
                  v-if="!item.subItems"
                  :to="item.link"
                  class="nav-link dropdown-toggle arrow-none side-nav-link-ref"
                >
                  <i :class="`${item.icon} me-2`"></i>
                  {{ item.label }}
                </router-link>

                <a
                  v-if="item.subItems"
                  class="nav-link dropdown-toggle arrow-none"
                  @click="onMenuClick"
                  href="javascript: void(0);"
                  id="topnav-components"
                  role="button"
                >
                  <i :class="`${item.icon} me-2`"></i>
                  {{ item.label }}
                  <div class="arrow-down"></div>
                </a>
                <div
                  class="dropdown-menu"
                  aria-labelledby="topnav-dashboard"
                  v-if="hasItems(item)"
                  :class="{
                    'dropdown-mega-menu-xl px-2': item.subItems.length > 11,
                  }"
                >
                  <template v-for="(subitem, index) of item.subItems">
                    <router-link
                      :key="index"
                      class="col dropdown-item side-nav-link-ref"
                      v-if="item.subItems.length < 11 && !hasItems(subitem)"
                      :to="subitem.link"
                      >{{ subitem.label }}</router-link
                    >
                    <div v-if="item.subItems.length > 11" :key="index">
                      <div v-if="index % 3 == 0" class="row">
                        <div class="col-lg-4">
                          <router-link
                            class="dropdown-item side-nav-link-ref"
                            :to="subitem.link"
                            >{{ item.subItems[index].label }}</router-link
                          >
                        </div>
                        <div class="col-lg-4" v-if="item.subItems[index + 1]">
                          <router-link
                            class="dropdown-item side-nav-link-ref"
                            :to="item.subItems[index + 1].link"
                            >{{ item.subItems[index + 1].label }}</router-link
                          >
                        </div>
                        <div class="col-lg-4" v-if="item.subItems[index + 2]">
                          <router-link
                            class="dropdown-item side-nav-link-ref"
                            :to="item.subItems[index + 2].link"
                            >{{ item.subItems[index + 2].label }}</router-link
                          >
                        </div>
                      </div>
                    </div>
                    <div class="dropdown" v-if="hasItems(subitem)" :key="index">
                      <a
                        class="dropdown-item"
                        href="javascript: void(0);"
                        @click="onMenuClick"
                      >
                        {{ subitem.label }}
                        <div class="arrow-down"></div>
                      </a>
                      <div class="dropdown-menu">
                        <router-link
                          v-for="(subSubitem, index) of subitem.subItems"
                          :key="index"
                          :to="subSubitem.link"
                          class="dropdown-item side-nav-link-ref"
                          >{{ subSubitem.label }}</router-link
                        >
                      </div>
                    </div>
                  </template>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
