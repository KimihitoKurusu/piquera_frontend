import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Configura la instancia de Axios con opciones predeterminadas
const axiosApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/',
  timeout: 10000, // 10 segundos
  
});


export default axiosApi