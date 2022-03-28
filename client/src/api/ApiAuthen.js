import axios from 'axios'
import { URL_AUTHEN } from '../constant'

const ApiAuthen = axios.create({
    baseURL: URL_AUTHEN,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Headers": "X-Requested-With"
    },
    //withCredentials: true,
});

export default ApiAuthen;