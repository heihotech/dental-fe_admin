export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: "text/plain, */*",
      },
      authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  // Set baseURL to something different
  api.setBaseURL(process.env.API_URL);

  // Inject to context as $api
  inject("apiTokenRequest", api);
}
