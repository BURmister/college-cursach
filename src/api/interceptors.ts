import axios from 'axios';
import Cookies from 'js-cookie'

export const getContentType = () => ({
   'Content-Type': 'application/json',
})

export const axiosClassic = axios.create({
   baseURL: `http://localhost:4200/api`,
   headers: getContentType(),
});

const instance = axios.create({
   baseURL: `http://localhost:4200/api`,
   headers: getContentType(),
});