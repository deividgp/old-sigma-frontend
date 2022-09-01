import axios from 'axios';

const baseURL = process.env.BASE_URL || "http://localhost:4000";

export default axios.create({
    baseURL: baseURL,
    withCredentials: true
});