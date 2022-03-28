import axios from 'axios'
import { URL_SERVER } from '../constant'

function refreshToken() {
    return ApiDatabase.post('/auth/refreshToken')
}

const ApiDatabase = axios.create({
    baseURL: URL_SERVER,
    headers: {
        'Content-Type': 'application/json',
    },
    //withCredentials: true,
});

// ApiDatabase.interceptors.response.use((response) => {
//     const { code } = response.data
//     if (code === 401) {
//         return refreshToken().then(rs => {
//             const { token } = rs.accessToken
//             ApiDatabase.defaults.headers['x-access-token'] = token
//                 // ApiDatabase.defaults.headers['Access-Control-Allow-Origin'] = "*"
//                 // ApiDatabase.defaults.headers['Access-Control-Allow-Headers'] = "X-Requested-With"

//             const config = response.config
//             config.headers['x-access-token'] = token
//                 // config.headers['Access-Control-Allow-Origin'] = "*"
//                 // config.headers['Access-Control-Allow-Headers'] = "X-Requested-With"

//             config.baseURL = URL_SERVER
//             return ApiDatabase(config)
//         })
//     }
//     return response
// }, error => {
//     return Promise.reject(error)
// })

export default ApiDatabase;