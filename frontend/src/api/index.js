import axios from "axios";

class Api {
  constructor() {
    const config = {
      baseURL: "http://localhost:5000/api/",
      // timeout: 60 * 1000, // Timeout
      // withCredentials: true, // Check cross-site Access-Control
    };

    // axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    this.axios = axios.create(config);
    this.middlewares();
  }

  async pypi_search(query) {
    const data = await this.axios.get(`search/${query}`);
    return data;
  }

  middlewares() {
    this.axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      function (response) {
        // Do something with response data
        return response;
      },
      function (error) {
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }
}

export default new Api();
