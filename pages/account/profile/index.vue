<script>
/**
 * Profile component
 */
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`
    };
  },
  data() {
    return {
      title: "Profil Pengguna",
      // api variable
      profile: {
        fullName: null,
        frontTitle: null,
        endTitle: null,
        nik: null,
        nip: null,
        nipType: null,
        gender: null,
        religion: null,
        birthDate: null,
        avatarUrl: null,
        addressId: null,
        isIndonesian: null
      },

      address: {
        location: null,
        villageId: null,
        phone: null,
        zipCode: null,
        latitude: null,
        longitude: null
      }
    };
  },
  mounted() {
    this.profile = {
      fullName: "Faiqul Azmi",
      frontTitle: "H.",
      endTitle: "S.Kom",
      nik: "3301142011940004",
      nip: "2021.05.814.250",
      nipType: "NIKY",
      gender: "M",
      religion: "ISLAM",
      birthDate: "1994-11-20",
      avatarUrl: null,
      addressId: 1,
      isIndonesian: true
    };

    this.address = {
      location: "Jalan KH Sufyan Tsauri 87",
      villageId: null,
      phone: null,
      zipCode: "53257",
      latitude: null,
      longitude: null
    };
  },
  computed: {
    fullName: function() {
      let fullName = "";
      if (this.profile.fullName !== null && this.profile.fullName !== "") {
        fullName = this.profile.fullName;
      }
      if (this.profile.frontTitle !== null && this.profile.frontTitle !== "") {
        fullName = this.profile.frontTitle + " " + fullName;
      }
      if (this.profile.endTitle !== null && this.profile.endTitle !== "") {
        fullName = fullName + ", " + this.profile.endTitle;
      }

      return fullName;
    }
  },
  middleware: "authentication"
};
</script>

<template>
  <div>
    <PageHeader :title="title" />

    <div class="row mb-4">
      <div class="col-xl-4">
        <div class="card h-100">
          <div class="card-body">
            <div class="text-center">
              <div class="clearfix"></div>
              <div>
                <img
                  src="~/assets/images/users/avatar-4.jpg"
                  alt
                  class="avatar-lg rounded-circle img-thumbnail"
                />
              </div>
              <h5 class="mt-3 mb-1">{{ fullName }}</h5>
              <p class="text-muted">112233</p>

              <div class="mt-4">
                <span class="badge bg-soft-primary font-size-12">Pengguna</span>
              </div>
            </div>

            <hr class="my-4" />

            <div class="text-muted">
              <div class="table-responsive mt-4 mb-0">
                <div>
                  <p class="mb-1">Nama Lengkap :</p>
                  <h5 class="font-size-16">Marcus</h5>
                </div>
                <div>
                  <p class="mb-1">NIK :</p>
                  <h5 class="font-size-16">Marcus</h5>
                </div>
                <div>
                  <p class="mb-1">NIP/NIKY :</p>
                  <h5 class="font-size-16">Marcus</h5>
                </div>
                <div>
                  <p class="mb-1">Jenis Kelamin :</p>
                  <h5 class="font-size-16">Marcus</h5>
                </div>
                <div>
                  <p class="mb-1">Agama :</p>
                  <h5 class="font-size-16">Marcus</h5>
                </div>
                <div>
                  <p class="mb-1">Tempat Tanggal Lahir :</p>
                  <h5 class="font-size-16">Marcus</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8">
        <div class="card mb-0">
          <b-tabs content-class="p-4" justified class="nav-tabs-custom">
            <b-tab active>
              <template v-slot:title>
                <i class="uil uil-user-circle font-size-20"></i>
                <span class="d-none d-sm-block">About</span>
              </template>
              <div>
                <div>
                  <h5 class="font-size-16 mb-4">Experience</h5>

                  <ul class="activity-feed mb-0 pl-2">
                    <li class="feed-item">
                      <div class="feed-item-list">
                        <p class="text-muted mb-1">2019 - 2020</p>
                        <h5 class="font-size-16">UI/UX Designer</h5>
                        <p>Abc Company</p>
                        <p class="text-muted">
                          To achieve this, it would be necessary to have uniform
                          grammar, pronunciation and more common words. If
                          several languages coalesce, the grammar of the
                          resulting language is more simple and regular than
                          that of the individual
                        </p>
                      </div>
                    </li>
                    <li class="feed-item">
                      <div class="feed-item-list">
                        <p class="text-muted mb-1">2017 - 2019</p>
                        <h5 class="font-size-16">Graphic Designer</h5>
                        <p>xyz Company</p>
                        <p class="text-muted">
                          It will be as simple as occidental in fact, it will be
                          Occidental. To an English person, it will seem like
                          simplified English, as a skeptical Cambridge friend of
                          mine told me what Occidental
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 class="font-size-16 mb-4">Projects</h5>

                  <div class="table-responsive">
                    <table class="table table-nowrap table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Projects</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          <th scope="col" style="width: 120px;">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">01</th>
                          <td>
                            <a href="#" class="text-dark">Brand Logo Design</a>
                          </td>
                          <td>18 Jun, 2020</td>
                          <td>
                            <span class="badge bg-soft-primary font-size-12"
                              >Open</span
                            >
                          </td>
                          <td>
                            <b-dropdown
                              right
                              toggle-class="text-muted font-size-18 px-2 p-0"
                              variant="white"
                            >
                              <template v-slot:button-content>
                                <i class="uil uil-ellipsis-v"></i>
                              </template>

                              <a class="dropdown-item" href="#">Action</a>
                              <a class="dropdown-item" href="#"
                                >Another action</a
                              >
                              <a class="dropdown-item" href="#"
                                >Something else here</a
                              >
                            </b-dropdown>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">02</th>
                          <td>
                            <a href="#" class="text-dark">Minible Admin</a>
                          </td>
                          <td>06 Jun, 2020</td>
                          <td>
                            <span class="badge bg-soft-primary font-size-12"
                              >Open</span
                            >
                          </td>
                          <td>
                            <b-dropdown
                              right
                              toggle-class="text-muted font-size-18 px-2 p-0"
                              variant="white"
                            >
                              <template v-slot:button-content>
                                <i class="uil uil-ellipsis-v"></i>
                              </template>

                              <a class="dropdown-item" href="#">Action</a>
                              <a class="dropdown-item" href="#"
                                >Another action</a
                              >
                              <a class="dropdown-item" href="#"
                                >Something else here</a
                              >
                            </b-dropdown>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">03</th>
                          <td>
                            <a href="#" class="text-dark">Chat app Design</a>
                          </td>
                          <td>28 May, 2020</td>
                          <td>
                            <span class="badge bg-soft-success font-size-12"
                              >Complete</span
                            >
                          </td>
                          <td>
                            <b-dropdown
                              right
                              toggle-class="text-muted font-size-18 px-2 p-0"
                              variant="white"
                            >
                              <template v-slot:button-content>
                                <i class="uil uil-ellipsis-v"></i>
                              </template>

                              <a class="dropdown-item" href="#">Action</a>
                              <a class="dropdown-item" href="#"
                                >Another action</a
                              >
                              <a class="dropdown-item" href="#"
                                >Something else here</a
                              >
                            </b-dropdown>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">04</th>
                          <td>
                            <a href="#" class="text-dark">Minible Landing</a>
                          </td>
                          <td>13 May, 2020</td>
                          <td>
                            <span class="badge bg-soft-success font-size-12"
                              >Complete</span
                            >
                          </td>
                          <td>
                            <b-dropdown
                              right
                              toggle-class="text-muted font-size-18 px-2 p-0"
                              variant="white"
                            >
                              <template v-slot:button-content>
                                <i class="uil uil-ellipsis-v"></i>
                              </template>

                              <a class="dropdown-item" href="#">Action</a>
                              <a class="dropdown-item" href="#"
                                >Another action</a
                              >
                              <a class="dropdown-item" href="#"
                                >Something else here</a
                              >
                            </b-dropdown>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">05</th>
                          <td>
                            <a href="#" class="text-dark"
                              >Authentication Pages</a
                            >
                          </td>
                          <td>06 May, 2020</td>
                          <td>
                            <span class="badge bg-soft-success font-size-12"
                              >Complete</span
                            >
                          </td>
                          <td>
                            <b-dropdown
                              right
                              toggle-class="text-muted font-size-18 px-2 p-0"
                              variant="white"
                            >
                              <template v-slot:button-content>
                                <i class="uil uil-ellipsis-v"></i>
                              </template>

                              <a class="dropdown-item" href="#">Action</a>
                              <a class="dropdown-item" href="#"
                                >Another action</a
                              >
                              <a class="dropdown-item" href="#"
                                >Something else here</a
                              >
                            </b-dropdown>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="uil uil-clipboard-notes font-size-20"></i>
                <span class="d-none d-sm-block">Tasks</span>
              </template>
              <div>
                <h5 class="font-size-16 mb-3">Active</h5>

                <div class="table-responsive">
                  <table class="table table-nowrap table-centered">
                    <tbody>
                      <tr>
                        <td style="width: 60px;">
                          <div
                            class="custom-control custom-checkbox text-center"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="tasks-activeCheck2"
                            />
                            <label
                              class="custom-control-label"
                              for="tasks-activeCheck2"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Ecommerce Product Detail</a
                          >
                        </td>

                        <td>27 May, 2020</td>
                        <td style="width: 160px;">
                          <span class="badge bg-soft-primary font-size-12"
                            >Active</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            class="custom-control custom-checkbox text-center"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="tasks-activeCheck1"
                            />
                            <label
                              class="custom-control-label"
                              for="tasks-activeCheck1"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Ecommerce Product</a
                          >
                        </td>

                        <td>26 May, 2020</td>
                        <td>
                          <span class="badge bg-soft-primary font-size-12"
                            >Active</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5 class="font-size-16 my-3">Upcoming</h5>

                <div class="table-responsive">
                  <table class="table table-nowrap table-centered">
                    <tbody>
                      <tr>
                        <td style="width: 60px;">
                          <div
                            class="custom-control custom-checkbox text-center"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="tasks-upcomingCheck3"
                            />
                            <label
                              class="custom-control-label"
                              for="tasks-upcomingCheck3"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Chat app Page</a
                          >
                        </td>

                        <td>-</td>
                        <td style="width: 160px;">
                          <span class="badge bg-soft-secondary font-size-12"
                            >Waiting</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            class="custom-control custom-checkbox text-center"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="tasks-upcomingCheck2"
                            />
                            <label
                              class="custom-control-label"
                              for="tasks-upcomingCheck2"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Email Pages</a
                          >
                        </td>

                        <td>04 June, 2020</td>
                        <td>
                          <span class="badge bg-soft-primary font-size-12"
                            >Approved</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            class="custom-control custom-checkbox text-center"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="tasks-upcomingCheck1"
                            />
                            <label
                              class="custom-control-label"
                              for="tasks-upcomingCheck1"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Contacts Profile Page</a
                          >
                        </td>

                        <td>-</td>
                        <td>
                          <span class="badge bg-soft-secondary font-size-12"
                            >Waiting</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5 class="font-size-16 my-3">Complete</h5>

                <div class="table-responsive">
                  <table class="table table-nowrap table-centered">
                    <tbody>
                      <tr>
                        <td style="width: 60px;">
                          <div
                            class="custom-control custom-checkbox text-center"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="tasks-completeCheck3"
                            />
                            <label
                              class="custom-control-label"
                              for="tasks-completeCheck3"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >UI Elements</a
                          >
                        </td>

                        <td>27 May, 2020</td>
                        <td style="width: 160px;">
                          <span class="badge bg-soft-success font-size-12"
                            >Complete</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            class="custom-control custom-checkbox text-center"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="tasks-completeCheck2"
                            />
                            <label
                              class="custom-control-label"
                              for="tasks-completeCheck2"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Authentication Pages</a
                          >
                        </td>

                        <td>27 May, 2020</td>
                        <td>
                          <span class="badge bg-soft-success font-size-12"
                            >Complete</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            class="custom-control custom-checkbox text-center"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="tasks-completeCheck1"
                            />
                            <label
                              class="custom-control-label"
                              for="tasks-completeCheck1"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Admin Layout</a
                          >
                        </td>

                        <td>26 May, 2020</td>
                        <td>
                          <span class="badge bg-soft-success font-size-12"
                            >Complete</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </b-tab>
          </b-tabs>
          <!-- Nav tabs -->
          <!-- Tab content -->
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>
