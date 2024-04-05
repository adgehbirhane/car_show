import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMDQ0MTk5NC04ZjAxLTQ4Y2EtOGNhYy05MzhhMDdhMmE0OTUiLCJmdWxsTmFtZSI6IkFiZWJlS2ViZWRlIiwicGhvbmUiOiIrMjUxOTM0OTA1MDA4IiwiZW1haWwiOiJhZGdlaGJpcmhhbmVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiYXZhdGFyUGF0aCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNC0wNC0wM1QxMDowNzozMC42OTBaIiwidXBkYXRlZEF0IjoiMjAyNC0wNC0wM1QxMDowNzozMC42OTBaIiwiaWF0IjoxNzEyMzI2OTY5LCJleHAiOjE3MTI0MTMzNjl9.7gC56ovqt-aaa1S2Mf7Jx4bXdhNVcrJPEQlF7yv_I4A'; // localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
