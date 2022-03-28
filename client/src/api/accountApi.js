import ApiAuthen from "./ApiAuthen";
import ApiDatabase from "./ApiDatabase";

const AccountApi = {
    login: async(email, password) => {
        const res = await ApiAuthen.post('/login', {
            email: email,
            password: password
        });

        try {
            await window.localStorage.setItem('accessToken', res.data.accessToken);
        } catch (e) {
            console.log('AsyncStorage Error');
        }
        try {
            await window.localStorage.setItem('refreshToken', res.data.refreshToken);
        } catch (e) {
            console.log('AsyncStorage Error');
        }

        return res.data
    },
    getAll: async() => {
        const res = await ApiDatabase.get('/account');
        return res.data
    }
}

export default AccountApi