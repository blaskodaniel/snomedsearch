import axios from 'axios';

/**
 * Axios instance
 */
export const APIclient = axios.create({
    baseURL: `${process.env.REACT_APP_BASEURL}/`
});