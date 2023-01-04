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
      doctor: {
        code: null,
        specialist: null,
        userId: null,
        schedules: [],
      },
      user: {
        username: null,
        email: null,
        phone: null,
        profileId: null,
      },
      profile: {
        fullName: null,
        nik: null,
        employeeId: null,
        gender: null,
        religion: null,
        birthDate: null,
        avatarUrl: null,
        isIndonesian: null,
        addressId: null,
      },
      //
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
      "/api/doctors/" +
      this.id +
      "?includeDeleted=true&withProfile=true&withSchedules=true";
    try {
      const resp = await this.$axios.get(url);

      if (resp.data) {
        // begin doctor
        if (resp?.data?.data) {
          for (const key in resp?.data?.data) {
            if (
              resp?.data?.data?.hasOwnProperty(key) &&
              this.doctor.hasOwnProperty(key)
            ) {
              this.doctor[key] = resp.data.data[key];
            }
          }
        }
        // end doctor
        // begin user
        if (resp?.data?.data?.user) {
          for (const key in resp?.data?.data?.user) {
            if (
              resp?.data?.data?.user?.hasOwnProperty(key) &&
              this.user.hasOwnProperty(key)
            ) {
              this.user[key] = resp.data.data.user[key];
            }
          }
        }
        // end user
        // begin profile
        if (resp?.data?.data?.user?.profile) {
          for (const key in resp?.data?.data?.user?.profile) {
            if (
              resp?.data?.data?.user?.profile?.hasOwnProperty(key) &&
              this.profile.hasOwnProperty(key)
            ) {
              this.profile[key] = resp.data.data.user.profile[key];
            }
          }
        }
        // end user
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
      title="Detail Dokter"
      title-class="font-18"
      hide-footer
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
                {{ profile.fullName ? profile.fullName : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">Spesialisasi</th>
              <td>
                {{ doctor.specialist ? doctor.specialist : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">No. Telepon</th>
              <td>
                {{ user.phone ? user.phone : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">NIK</th>
              <td>
                {{ profile.nik ? profile.nik : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">Jenis Kelamin</th>
              <td>
                {{ profile.gender ? $getGenderText(profile.gender) : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">Tanggal Lahir</th>
              <td>
                {{ profile.birthDate ? profile.birthDate : "-" }}
              </td>
            </tr>
            <tr>
              <th scope="row">Usia</th>
              <td>
                {{
                  profile.birthDate
                    ? `${$calculateAge(profile.birthDate)} Tahun`
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
            <tr>
              <th scope="row">Jadwal</th>
              <td>
                <ul v-if="doctor.schedules.length > 0">
                  <li v-for="el in doctor.schedules" :key="el.id">
                    {{ $switchDay(el) }}, {{ el.time }}
                  </li>
                </ul>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- end table -->
    </b-modal>
  </div>
</template>
