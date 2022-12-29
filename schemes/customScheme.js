import { LocalScheme } from "~auth/runtime";

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser(endpoint) {
    // Token is required but not available
    if (!this.check().valid) {
      return;
    }
    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({});
      return;
    }
    return this.$auth
      .requestWith(this.name, endpoint, this.options.endpoints.user)
      .then((response) => {
        if (response.data.data) {
          this.$auth.setUser(response.data.data);
          // this.$auth.setUser({
          //   ...response.data.data,
          //   roles: [
          //     { id: "dd3d1dc2-34e9-42a3-82c2-f7cba878d867", name: "admin" }
          //   ]
          // });
        } else {
          this.$auth.setUser({});
        }
        return response;
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: "fetchUser" });
      });
  }
}
