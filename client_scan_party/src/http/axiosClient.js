import axios from 'axios';
import queryString from 'query-string';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

// axiosClient.interceptors.request.use(async (config) => {
//   // Handle token here ...
//   return config;
// });
axiosClient.interceptors.request.use(
    (config) => {
        config.headers = config.headers || {};

        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers = {
                authorization: `Bearer ${token}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
},
    async (error) => {
        const err = (error.response && error.response.data) || error;
        if (err.error === 'invalid_token') {
            //dispatch(signOut)l
        }
        return Promise.reject(error);
    });

export default axiosClient; 