import axios from 'axios';
import { getAuthToken } from './helpers'


const instance = axios.create({
    baseURL: 'http://localhost:5002/api/'
    // baseURL: 'http://82.146.40.11:5002/api/'
});

instance.defaults.headers.common = { 'Authorization': `Bearer ${getAuthToken()}` }
export default instance;