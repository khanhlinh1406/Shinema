import axios from 'axios'
import { URL_SERVER } from '../constant'
import ApiAuthen from './ApiAuthen';

const ApiDatabase = axios.create({
    baseURL: URL_SERVER,
    headers: {
        'Content-Type': 'application/json',
    },
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

ApiDatabase.interceptors.request.use(
        async(config) => {
            let token = localStorage.getItem('accessToken')
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

            //axios.interceptors.response.eject(interceptor);

            const originalConfig = err.config;
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                return ApiAuthen.post('/refreshToken', {
                        token: localStorage.getItem('refreshToken')
                    }).then(rs => {
                        localStorage.setItem('accessToken', rs.data.accessToken)
                            // originalConfig.headers['x-access-token'] = rs.data.accessToken                                                  
                        return ApiDatabase(originalConfig);
                    })
                    .catch(error => {
                        return Promise.reject(error)
                    })
                    // try {
                    //     const rs = await refreshToken();

                //     window.localStorage.setItem('accessToken', rs.data.accessToken)
                //     originalConfig.baseURL = URL_SERVER
                //     originalConfig.headers['x-access-token'] = rs.data.accessToken
                //     return ApiDatabase(originalConfig);
                // } catch (_error) {
                //     return Promise.reject(_error);
                // }
            }
        }

        return Promise.reject(err);
    })

export default ApiDatabase;