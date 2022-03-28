import axios from 'axios'
import { URL_AUTHEN } from '../constant'

const ApiAuthen = axios.create({
    baseURL: URL_AUTHEN,
    headers: {
        'Content-Type': 'application/json',
    },
    //withCredentials: true,
});

export default ApiAuthen;