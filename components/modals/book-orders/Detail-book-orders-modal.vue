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
      patient: {
        phoneNumber: null,
        email: null,
        fullName: null,
        nik: null,
        gender: null,
        religion: null,
        birthDate: null,
        avatarUrl: null,
        isIndonesian: null,
        addressId: null,
        bookOrders: [],
      },
      address: {
        location: null,
        villageId: null,
        phone: null,
        zipCode: null,
        latitude: null,
        longitude: null,
        village: null,
      },
    };
  },
  methods: {
    resetModal() {
      this.$emit("close");
      this.isModalActive = !this.isModalActive;
    },
    handleOk() {
      this.$emit("close");
      this.isModalActive = !this.isModalActive;
    },
  },
  async fetch() {
    this.isBusy = true;
    let url =
      "/api/patients/" +
      this.id +
      "?includeDeleted=true&withAddress=true&withRecords=true";
    try {
      const resp = await this.$axios.get(url);

      if (resp.data) {
        // begin patient
        if (resp?.data?.data) {
          for (const key in resp?.data?.data) {
            if (
              resp?.data?.data?.hasOwnProperty(key) &&
              this.patient.hasOwnProperty(key)
            ) {
              this.patient[key] = resp.data.data[key];
            }
          }
        }

        if (this.patient.bookOrders.length > 0) {
          this.patient.bookOrders = this.patient.bookOrders.reverse();
        }
        // end patient
        // begin address
        if (resp?.data?.data?.address) {
          for (const key in resp?.data?.data?.address) {
            if (
              resp?.data?.data?.address?.hasOwnProperty(key) &&
              this.address.hasOwnProperty(key)
            ) {
              this.address[key] = resp.data.data.address[key];
            }
          }
        }
        // end address
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
      title="Detail Reservasi"
      title-class="font-18"
      hide-footer
      size="lg"
      @close="resetModal"
      @hide="resetModal"
      @ok="handleOk"
    >
      <!-- begin table -->
      <div class="table-responsive" v-if="isBusy === false">
        <table class="table table-striped mb-0">
          <tbody>
            <tr>
              <th scope="row" style="width: 50%">Nama</th>
              <td style="width: 50%">
                {{ patient.fullName ? patient.fullName : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">No. Telepon</th>
              <td>
                {{ patient.phoneNumber ? patient.phoneNumber : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">NIK</th>
              <td>
                {{ patient.nik ? patient.nik : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">Jenis Kelamin</th>
              <td>
                {{ patient.gender ? $getGenderText(patient.gender) : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">Tanggal Lahir</th>
              <td>
                {{ patient.birthDate ? patient.birthDate : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">Usia</th>
              <td>
                {{
                  patient.birthDate
                    ? `${$calculateAge(patient.birthDate)} Tahun`
                    : "-"
                }}
              </td>
            </tr>
            <tr>
              <th scope="row">Alamat</th>
              <td>
                <span v-if="address">
                  {{
                    $parsingAddress(address).length > 0
                      ? $parsingAddress(address)
                      : "-"
                  }}
                </span>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- end table -->
      <!-- begin table -->
      <div v-if="isBusy === false && patient.bookOrders.length > 0">
        <div
          class="table-responsive"
          v-for="el in patient.bookOrders"
          :key="el.arrival"
        >
          <table class="table table-striped mb-0">
            <tbody>
              <tr>
                <th scope="row" style="text-align: center" colspan="2">
                  {{
                    $parsingDateTime(el.arrival ? el.arrival : el.arrivalPlan)
                  }}
                </th>
              </tr>
              <tr>
                <th scope="row" style="width: 25%">DX</th>
                <td style="width: 75%">
                  {{ el.diagnose ? el.diagnose : "-" }}
                </td>
              </tr>
              <tr>
                <th scope="row">TX</th>
                <td>
                  {{ el.therapy ? el.therapy : "-" }}
                </td>
              </tr>
              <tr>
                <th scope="row">Keluhan Pasien</th>
                <td>
                  {{ el.patientComplaint ? el.patientComplaint : "-" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- end table -->
    </b-modal>
  </div>
</template>
