import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Include credentials in requests 
  //process.env.REACT_APP_BASE_URL ||
}); 

export default axiosInstance;