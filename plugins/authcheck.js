export default ({ app }, inject) => {
  // Inject $upload(msg) in Vue, context and store.
  // inject("upload", msg => console.log(`Hello ${msg}!`));
  inject("checkRolesExist", (roles, rolesAllowed) => {
    let roleCheck = false;
    roles.map((el) => {
      rolesAllowed.map((i) => {
        if (el.name === i) {
          roleCheck = true;
          return roleCheck;
        }
      });
    });
    return roleCheck;
  });
};
