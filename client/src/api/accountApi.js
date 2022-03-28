import ApiAuthen from "./ApiAuthen";
import ApiDatabase from "./ApiDatabase";


const AccountApi = {
    login: async(email, password) => {
        const res = await ApiAuthen.get('/login');

        ApiDatabase.defaults.headers['x-access-token'] = res.accessToken
        return res.data
    },
    getAll: async() => {
        const res = await ApiDatabase.get('/account/');
        return res.data
    }
}

export default AccountApi