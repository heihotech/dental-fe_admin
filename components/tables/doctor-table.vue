<script>
import Multiselect from "vue-multiselect";
export default {
  components: { Multiselect },
  data() {
    return {
      modalActive: {
        isModalCreateDoctorActive: false,
        isModalDeleteDoctorActive: false,
        isModalRestoreDoctorActive: false,
        isModalDetailDoctorActive: false,
        isModalEditDoctorActive: false,
      },
      rowId: null,
      tableData: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filterFullName: null,
      filterCode: null,
      filterSpecialist: null,
      filterIncludeDeleted: false,
      isBusy: false,
      sortBy: "updatedAt",
      sortDesc: true,
      fields: [],
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
          label: "Kode",
          key: "code",
          sortable: false,
          // thStyle: { width: `16%` },
        },
        {
          label: "Spesialis",
          key: "specialist",
          sortable: false,
          // thStyle: { width: `16%` },
        },
        {
          label: "Status",
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
    filterCode: {
      handler: function () {
        this.$fetch().catch((error) => {
          console.error(error);
        });
      },
    },
    filterSpecialist: {
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
  },
  async fetch() {
    this.isBusy = true;
    let url = "/api/doctors?withProfile=true&withSchedules=true";

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
    if (this.filterCode) {
      url = url + "&code=" + this.filterCode;
    }
    if (this.filterSpecialist) {
      url = url + "&specialist=" + this.filterSpecialist;
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
    <create-doctors-modal
      v-if="modalActive.isModalCreateDoctorActive"
      @close="
        toggleModal({
          modal: 'CreateDoctor',
          isReFetch: true,
          mode: 'close',
        })
      "
    />
    <delete-doctors-modal
      v-if="modalActive.isModalDeleteDoctorActive"
      :id="rowId"
      @close="
        toggleModal({
          modal: 'DeleteDoctor',
          isReFetch: true,
          mode: 'close',
        })
      "
    />
    <restore-doctors-modal
      v-if="modalActive.isModalRestoreDoctorActive"
      :id="rowId"
      @close="
        toggleModal({
          modal: 'RestoreDoctor',
          isReFetch: true,
          mode: 'close',
        })
      "
    />
    <edit-doctors-modal
      v-if="modalActive.isModalEditDoctorActive"
      :id="rowId"
      @close="
        toggleModal({
          modal: 'EditDoctor',
          isReFetch: true,
          mode: 'close',
        })
      "
    />
    <detail-doctors-modal
      v-if="modalActive.isModalDetailDoctorActive"
      :id="rowId"
      @close="
        toggleModal({
          modal: 'DetailDoctor',
          isReFetch: false,
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
            <b-form-group label="Kode" label-for="code" class="mb-2">
              <b-form-input
                v-model="filterCode"
                debounce="500"
                id="nik"
                type="text"
              ></b-form-input>
            </b-form-group>
            <!-- end col -->
          </div>
          <!-- col -->
          <div class="col-sm-12 col-md-3">
            <b-form-group label="Spesialis" label-for="specialist" class="mb-2">
              <b-form-input
                v-model="filterSpecialist"
                debounce="500"
                id="specialist"
                type="number"
              ></b-form-input>
            </b-form-group>
            <!-- end col -->
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
                      modal: 'CreateDoctor',
                      isReFetch: false,
                      mode: 'open',
                    })
                  "
                  ><i class="uil uil-plus"></i> Tambah Dokter</b-button
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
                <template #cell(deletedAt)="data">
                  <span
                    v-if="data.item.deletedAt === null"
                    class="badge badge-pill bg-success"
                  >
                    Aktif
                  </span>
                  <span
                    v-if="data.item.deletedAt !== null"
                    class="badge badge-pill bg-danger"
                  >
                    Non Aktif
                  </span>
                </template>
                <template #cell(fullName)="data">
                  <span v-if="data.item.fullName !== null">
                    <a
                      href="#"
                      @click="
                        toggleModal({
                          modal: 'DetailDoctor',
                          isReFetch: false,
                          id: parseInt(data.item.id),
                          mode: 'open',
                        })
                      "
                    >
                      {{ data.item.user.profile.fullName }}
                    </a>
                  </span>
                  <span v-else>-</span>
                </template>
                <template #cell(address)="data">
                  <span v-if="data.item.address">
                    {{
                      $parsingAddress(data.item.address).length > 0
                        ? $parsingAddress(data.item.address)
                        : "-"
                    }}
                  </span>
                  <span v-else>-</span>
                </template>
                <template #cell(ageCalculated)="data">
                  <span v-if="data.item.birthDate !== null">
                    {{ $calculateAge(data.item.birthDate) }} Tahun
                  </span>
                  <span v-else>-</span>
                </template>
                <template #cell(nik)="data">
                  <span v-if="data.item.nik !== null">
                    {{ data.item.nik }}
                  </span>
                  <span v-else>-</span>
                </template>
                <template #cell(phoneNumber)="data">
                  <span v-if="data.item.phoneNumber !== null">
                    {{ data.item.phoneNumber }}
                  </span>
                  <span v-else>-</span>
                </template>
                <template #cell(id)="data">
                  <b-dropdown variant="primary" size="sm">
                    <template v-slot:button-content>
                      <i class="uil uil-bright"></i>
                    </template>
                    <b-dropdown-item-button
                      @click.native="
                        toggleModal({
                          modal: 'EditDoctor',
                          isReFetch: false,
                          id: parseInt(data.item.id),
                          mode: 'open',
                        })
                      "
                      ><i class="uil uil-edit-alt"></i>
                      Edit</b-dropdown-item-button
                    >
                    <b-dropdown-item-button
                      v-if="data.item.deletedAt === null"
                      variant="danger"
                      @click.native="
                        toggleModal({
                          modal: 'DeleteDoctor',
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
                          modal: 'RestoreDoctor',
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
