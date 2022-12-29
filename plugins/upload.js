export default ({ app, $axios }, inject) => {
  // Inject $upload(msg) in Vue, context and store.
  // inject("upload", msg => console.log(`Hello ${msg}!`));
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  inject(
    "uploadService",
    async (dest, file, onUploadProgress, limitSizeInMB = 0) => {
      let formData = new FormData();

      formData.append("dest", dest);
      formData.append("uploaded_file", file);

      if (limitSizeInMB > 0) {
        const { size } = formData.get("uploaded_file");

        if (size > limitSizeInMB * 1024 * 1024) {
          throw new Error(`Ukuran file terlalu besar, max ${limitSizeInMB} MB`);
        }
      }

      const uploadedFile = await $axios.post(
        `${process.env.API_URL}/api/upload/file`,
        formData,
        { onUploadProgress }
      );

      return uploadedFile;
    }
  );
};
