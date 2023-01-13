<script>
import Multiselect from "vue-multiselect";
export default {
  components: { Multiselect },
  data() {
    return {
      modalActive: {
        isModalCreateBookOrderActive: false,
        isModalDeleteBookOrderActive: false,
        isModalRestoreBookOrderActive: false,
        isModalDetailBookOrderActive: false,
        isModalEditBookOrderActive: false,
        isModalValidateBookOrderActive: false,
        isModalEvaluateBookOrderActive: false,
      },
      rowId: null,
      tableData: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filterFullName: null,
      filterState: null,
      filterDoctor: null,
      filterIncludeDeleted: false,
      isBusy: false,
      sortBy: "arrival",
      sortDesc: true,
      fields: [],
      //
      selectedDoctor: null,
      doctorsFetchedData: [],
      //
      isPublicRelation: false,
    };
  },
  computed: {
    order() {
      return this.sortDesc == false ? "asc" : "desc";
    },
    computedFields() {
      this.fields.push(
        { label: "Aksi", key: "id", thStyle: { width: `4%` } },
        {
          label: "Nama",
          key: "fullName",
          sortable: true,
          // thStyle: { width: `25%` },
        },
        {
          label: "No. Telepon",
          key: "phoneNumber",
          sortable: true,
          // thStyle: { width: `25%` },
        },
        {
          label: "Usia",
          key: "age",
          sortable: false,
          // thStyle: { width: `16%` },
        },
        {
          label: "Tujuan",
          key: "doctor",
          sortable: false,
          // thStyle: { width: `16%` },
        },
        {
          label: "Jam Praktek",
          key: "schedule",
          sortable: false,
          // thStyle: { width: `16%` },
        },
        {
          label: "Status",
          key: "status",
          sortable: false,
          // thStyle: { width: `10%` },
        },
        {
          label: "Dihapus",
          key: "deletedAt",
          sortable: false,
          // thStyle: { width: `10%` },
        }
      );

      return this.fields;
    },
  },
  watch: {
    currentPage: {
      handler: function () {
        this.$fetch().catch((error) => {
          console.error(error);
        });
      },
    },
    perPage: {
      handler: function () {
        this.$fetch().catch((error) => {
          console.error(error);
        });
      },
    },
    sortBy: {
      handler: function () {
        this.$fetch().catch((error) => {
          console.error(error);
        });
      },
    },
    sortDesc: {
      handler: function () {
        this.$fetch().catch((error) => {
          console.error(error);
        });
      },
    },
    filterFullName: {
      handler: function () {
        this.$fetch().catch((error) => {
          console.error(error);
        });
      },
    },
    filterState: {
      handler: function () {
        this.$fetch().catch((error) => {
          console.error(error);
        });
      },
    },
    selectedDoctor: {
      handler: function () {
        if (this.selectedDoctor !== null) {
          this.filterDoctor = this.selectedDoctor.value;
        } else {
          this.filterDoctor = null;
        }
      },
    },
    filterDoctor: {
      handler: function () {
        this.$fetch().catch((error) => {
          console.error(error);
        });
      },
    },
    filterIncludeDeleted: {
      handler: function () {
        this.$fetch().catch((error) => {
          console.error(error);
        });
      },
    },
  },
  methods: {
    async toggleModal({ modal, isReFetch, id, mode }) {
      let modalName = `isModal${
        modal.charAt(0).toUpperCase() + modal.slice(1)
      }Active`;
      if (id) {
        this.rowId = id;
      }
      if (mode === "open") {
        this.modalActive[modalName] = true;
      } else {
        this.modalActive[modalName] = false;
      }

      if (isReFetch === true) {
        await this.$fetch();
      }
    },
    async fetchDoctors(name) {
      this.isBusy = true;

      let url =
        "/api/doctors?page=1&size=10&order=createdAt%3Adesc&withProfile=true";

      if (name.length >= 3) {
        url = url + "&fullName=" + name;
      }

      try {
        const resp = await this.$axios.get(url);

        if (resp.data) {
          this.doctorsFetchedData = [];
          if (resp.data.data.length > 0) {
            resp.data.data.map((el) => {
              this.doctorsFetchedData.push({
                value: el.id,
                name: `${
                  el.user.profile.fullName ? el.user.profile.fullName + " " : ""
                }`,
                schedules: el.schedules,
              });
            });
          }
        }
      } catch (error) {}

      this.isBusy = false;
    },
  },
  async fetch() {
    this.isBusy = true;
    let url =
      "/api/book-orders?withDoctor=true&withSchedule=true&withPatient=true";

    if (this.perPage) {
      url = url + "&size=" + this.perPage;
    }
    if (this.currentPage) {
      url = url + "&page=" + this.currentPage;
    }
    if (this.sortBy) {
      url =
        url + "&order=" + this.sortBy + ":" + (this.sortDesc ? "desc" : "asc");
    }

    if (this.filterFullName) {
      url = url + "&fullName=" + this.filterFullName;
    }
    if (this.filterState) {
      switch (this.filterState) {
        case "onlyNotValidated":
          url = url + "&onlyNotValidated=true";
          break;
        case "onlyNotEvaluated":
          url = url + "&onlyNotEvaluated=true";
          break;
        case "onlyEvaluated":
          url = url + "&onlyEvaluated=true";
          break;

        default:
          break;
      }
    }
    if (this.filterDoctor) {
      url = url + "&doctorId=" + this.filterDoctor;
    }
    if (this.filterIncludeDeleted === true) {
      url = url + "&includeDeleted=true";
    }
    try {
      const resp = await this.$axios.get(url);

      if (resp.data) {
        this.tableData = [];
        this.totalRows = parseInt(resp.data.meta.total);

        if (resp.data.data && resp.data.data.length > 0) {
          resp.data.data.map((el) => {
            this.tableData.push(el);
          });
        }
      }
    } catch (error) {}
    console.log("fetched at: " + this.$fetchState.timestamp);
    this.isBusy = false;
  },
  created() {},
};
</script>

<template>
  <div>
    <create-book-orders-modal
      v-if="modalActive.isModalCreateBookOrderActive"
      @close="
        toggleModal({
          modal: 'CreateBookOrder',
          isReFetch: true,
          mode: 'close',
        })
      "
    />
    <delete-book-orders-modal
      v-if="modalActive.isModalDeleteBookOrderActive"
      :id="rowId"
      @close="
        toggleModal({
          modal: 'DeleteBookOrder',
          isReFetch: true,
          mode: 'close',
        })
      "
    />
    <restore-book-orders-modal
      v-if="modalActive.isModalRestoreBookOrderActive"
      :id="rowId"
      @close="
        toggleModal({
          modal: 'RestoreBookOrder',
          isReFetch: true,
          mode: 'close',
        })
      "
    />
    <edit-book-orders-modal
      v-if="modalActive.isModalEditBookOrderActive"
      :id="rowId"
      @close="
        toggleModal({
          modal: 'EditBookOrder',
          isReFetch: true,
          mode: 'close',
        })
      "
    />
    <detail-book-orders-modal
      v-if="modalActive.isModalDetailBookOrderActive"
      :id="rowId"
      @close="
        toggleModal({
          modal: 'DetailBookOrder',
          isReFetch: false,
          mode: 'close',
        })
      "
    />
    <validate-book-orders-modal
      v-if="modalActive.isModalValidateBookOrderActive"
      :id="rowId"
      @close="
        toggleModal({
          modal: 'ValidateBookOrder',
          isReFetch: true,
          mode: 'close',
        })
      "
    />
    <evaluate-book-orders-modal
      v-if="modalActive.isModalEvaluateBookOrderActive"
      :id="rowId"
      @close="
        toggleModal({
          modal: 'EvaluateBookOrder',
          isReFetch: true,
          mode: 'close',
        })
      "
    />

    <!-- card -->
    <div class="card">
      <div class="card-body pt-2 pb-3">
        <!-- row -->
        <div class="row">
          <!-- col -->
          <div class="col-sm-12 col-md-3">
            <b-form-group label="Nama " label-for="name" class="mb-2">
              <b-form-input
                v-model="filterFullName"
                debounce="500"
                id="name"
                type="text"
              ></b-form-input>
            </b-form-group>
            <!-- end col -->
          </div>
          <!-- col -->
          <div class="col-sm-12 col-md-3">
            <b-form-group label="Status" label-for="state" class="mb-2">
              <select class="form-select" v-model="filterState" required>
                <option :value="null">Semua</option>
                <option value="onlyNotValidated">Perlu Validasi</option>
                <option value="onlyNotEvaluated">Siap Diperiksa</option>
                <option value="onlyEvaluated">Selesai</option>
              </select>
            </b-form-group>
            <!-- end col -->
          </div>
          <!-- col -->
          <div class="col-sm-12 col-md-3">
            <div class="mb-3">
              <label for="village">Nama Dokter</label>
              <multiselect
                v-model="selectedDoctor"
                id="ajax"
                label="name"
                track-by="name"
                placeholder="Ketikkan nama"
                open-direction="bottom"
                :options="doctorsFetchedData"
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
                :hide-selected="false"
                @search-change="fetchDoctors"
              ></multiselect>
            </div>
          </div>
          <div class="col-sm-12 col-md-3">
            <b-form-group
              label="Termasuk dihapus"
              label-for="name"
              class="mb-2"
            >
              <select
                class="form-select"
                v-model="filterIncludeDeleted"
                required
              >
                <option :value="true">Iya</option>
                <option :value="false">Tidak</option>
              </select>
            </b-form-group>
            <!-- end col -->
          </div>

          <!-- end row -->
        </div>
      </div>
    </div>
    <!-- end card -->

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="col-12">
              <div class="col-md-2 col-sm-12 mb-2" align-self="end">
                <b-button
                  variant="primary"
                  size="md"
                  block
                  @click="
                    toggleModal({
                      modal: 'CreateBookOrder',
                      isReFetch: false,
                      mode: 'open',
                    })
                  "
                  ><i class="uil uil-plus"></i> Buat Reservasi Offline</b-button
                >
              </div>
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                striped
                bordered
                hover
                show-empty
                :items="tableData"
                :fields="computedFields"
                responsive="sm"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :per-page="0"
                :busy="isBusy"
                style="minheight: 500px"
              >
                <template #table-busy>
                  <div class="text-center text-primary my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Memuat data...</strong>
                  </div>
                </template>
                <template #empty>
                  <div class="text-center text-secondary my-2">
                    <strong>Tidak ada data</strong>
                  </div>
                </template>
                <template #emptyfiltered>
                  <div class="text-center text-secondary my-2">
                    <strong>Data tidak ditemukan</strong>
                  </div>
                </template>
                <template #cell(fullName)="data">
                  <span v-if="data.item.patientId !== null">
                    <a
                      href="#"
                      @click="
                        toggleModal({
                          modal: 'DetailBookOrder',
                          isReFetch: false,
                          id: parseInt(data.item.patientId),
                          mode: 'open',
                        })
                      "
                    >
                      {{ data.item.patient.fullName }}
                    </a>
                  </span>
                  <span v-else>{{ data.item.fullName }}</span>
                </template>
                <template #cell(status)="data">
                  <span
                    v-if="
                      data.item.arrival === null && data.item.patientId === null
                    "
                    class="badge badge-pill bg-warning"
                  >
                    Belum Validasi
                  </span>
                  <span
                    v-if="
                      data.item.arrival !== null &&
                      data.item.patientId !== null &&
                      data.item.diagnose === null &&
                      data.item.therapy === null &&
                      data.item.cost === null
                    "
                    class="badge badge-pill bg-info"
                  >
                    Siap Diperiksa
                  </span>
                  <span
                    v-if="
                      data.item.arrival !== null &&
                      data.item.patientId !== null &&
                      (data.item.diagnose !== null ||
                        data.item.therapy !== null ||
                        data.item.cost !== null)
                    "
                    class="badge badge-pill bg-success"
                  >
                    Selesai
                  </span>
                </template>
                <template #cell(deletedAt)="data">
                  <span
                    v-if="data.item.deletedAt === null"
                    class="badge badge-pill bg-success"
                  >
                    Tidak
                  </span>
                  <span
                    v-if="data.item.deletedAt !== null"
                    class="badge badge-pill bg-danger"
                  >
                    Ya
                  </span>
                </template>
                <template #cell(age)="data">
                  <span v-if="data.item.patient?.birthDate">
                    {{ $calculateAge(data.item.patient?.birthDate) }} Tahun
                  </span>
                  <span v-else>-</span>
                </template>
                <template #cell(doctor)="data">
                  <span v-if="data.item.doctor !== null">
                    {{ data.item.doctor.user.profile.fullName }}
                  </span>
                  <span v-else>-</span>
                </template>
                <template #cell(schedule)="data">
                  <span
                    v-if="
                      data.item.arrival !== null ||
                      data.item.arrivalPlan !== null
                    "
                  >
                    {{
                      $parsingDateTime(
                        data.item.arrival
                          ? data.item.arrival
                          : data.item.arrivalPlan
                      ) +
                      ", " +
                      data.item.schedule.time
                    }}
                    <!-- </a> -->
                  </span>
                  <span v-else>-</span>
                </template>
                <template #cell(id)="data">
                  <b-dropdown variant="primary" size="sm">
                    <template v-slot:button-content>
                      <i class="uil uil-bright"></i>
                    </template>
                    <!-- <b-dropdown-item-button
                      @click.native="
                        toggleModal({
                          modal: 'EditBookOrder',
                          isReFetch: false,
                          id: parseInt(data.item.id),
                          mode: 'open',
                        })
                      "
                      ><i class="uil uil-edit-alt"></i> Edit
                      Reservasi</b-dropdown-item-button
                    > -->
                    <b-dropdown-item-button
                      v-if="data.item.patientId === null"
                      @click.native="
                        toggleModal({
                          modal: 'ValidateBookOrder',
                          isReFetch: false,
                          id: parseInt(data.item.id),
                          mode: 'open',
                        })
                      "
                      ><i class="uil uil-check"></i> Validasi
                      Kedatangan</b-dropdown-item-button
                    >
                    <b-dropdown-item-button
                      v-if="
                        data.item.patientId !== null &&
                        data.item.arrival !== null
                      "
                      @click.native="
                        toggleModal({
                          modal: 'EvaluateBookOrder',
                          isReFetch: false,
                          id: parseInt(data.item.id),
                          mode: 'open',
                        })
                      "
                      ><i class="uil uil-file-medical-alt"></i>
                      <span
                        v-if="
                          data.item.arrival !== null &&
                          data.item.patientId !== null &&
                          data.item.diagnose === null &&
                          data.item.therapy === null &&
                          data.item.cost === null
                        "
                      >
                        Evaluasi
                      </span>
                      <span
                        v-if="
                          data.item.arrival !== null &&
                          data.item.patientId !== null &&
                          (data.item.diagnose !== null ||
                            data.item.therapy !== null ||
                            data.item.cost !== null)
                        "
                      >
                        Edit Evaluasi
                      </span></b-dropdown-item-button
                    >
                    <b-dropdown-item-button
                      v-if="data.item.deletedAt === null"
                      variant="danger"
                      @click.native="
                        toggleModal({
                          modal: 'DeleteBookOrder',
                          isReFetch: false,
                          id: parseInt(data.item.id),
                          mode: 'open',
                        })
                      "
                      ><i class="uil uil-trash-alt"></i>
                      Hapus</b-dropdown-item-button
                    >
                    <b-dropdown-item-button
                      v-if="data.item.deletedAt !== null"
                      @click.native="
                        toggleModal({
                          modal: 'RestoreBookOrder',
                          isReFetch: false,
                          id: parseInt(data.item.id),
                          mode: 'open',
                        })
                      "
                      ><i class="uil uil-redo"></i>
                      Restore</b-dropdown-item-button
                    >
                  </b-dropdown>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-end"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
