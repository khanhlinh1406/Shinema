import axios from 'axios'
import { URL_SERVER } from '../constant'
import ApiAuthen from './ApiAuthen';

const ApiDatabase = axios.create({
    baseURL: URL_SERVER,
    headers: {
        'Content-Type': 'application/json',
    },
    //withCredentials: true,
});

// ApiDatabase.interceptors.request.use(
//     async(config) => {
//         let token = config.cookies.access_token
//         if (token) {
//             config.headers["x-access-token"] = token;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// ApiDatabase.interceptors.response.use((response) => {
//     const { code } = response.data
//     if (code === 401) {
//         return refreshToken().then(rs => {
//             const { token } = rs.accessToken
//             ApiDatabase.defaults.headers['x-access-token'] = token

//             const config = response.config
//             config.headers['x-access-token'] = token

//             config.baseURL = URL_SERVER
//             return ApiDatabase(config)
//         })
//     }
//     return response
// }, error => {
//     return Promise.reject(error)
// })

function getLocalToken() {
    const token = window.localStorage.getItem('accessToken')
    return token
}

//get token o refreshToken
function getLocalRefreshToken() {
    const token = window.localStorage.getItem('refreshToken')
    return token
}

function refreshToken() {
    return ApiAuthen.post('/refreshToken', {
        token: getLocalRefreshToken()
    })
}

ApiDatabase.interceptors.request.use(
        async(config) => {
            let token = getLocalToken()
            if (token) {
                config.headers["x-access-token"] = token;
            }
            return config;
        },
        error => {
            return Promise.reject(error)
        }
    )
    // response parse
ApiDatabase.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        if (err.response) {
            const originalConfig = err.config;
            if (err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await refreshToken();
                        console.log('res token', rs)
                        window.localStorage.setItem('accessToken', rs.data.accessToken)
                        return ApiDatabase(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
        }
        return Promise.reject(err);
    })

export default ApiDatabase;