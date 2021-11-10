<script>
import axios from 'axios';

export default {
  computed: {
    axiosInstance() {
      const instance = axios.create({
        timeout: 30000,
        responseType: 'json',
      });
      instance.interceptors.response.use((response) => response, (error) => {
        console.dir(error);

        if (error.code === 'ECONNABORTED') {
          return Promise.reject(error);
        }

        if (error.response.status === 404) {
          this.$router.push('/404');
          return Promise.reject(error);
        }

        return Promise.reject(error);
      });

      return instance;
    },
  },
};
</script>
