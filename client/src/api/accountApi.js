import ApiAuthen from "./ApiAuthen";
import ApiDatabase from "./ApiDatabase";

const AccountApi = {
    login: async(email, password) => {
        const res = await ApiAuthen.post('/login', {
            email: email,
            password: password
        });

        if (res.data == 'Password incorrect' || res.data == 'Email not exist') {
            return res
        }

        try {
            localStorage.setItem('accessToken', res.data.accessToken);
        } catch (e) {
            console.log('AsyncStorage Error');
        }
        try {
            localStorage.setItem('refreshToken', res.data.refreshToken);
        } catch (e) {
            console.log('AsyncStorage Error');
        }

        const account = await ApiDatabase.get('/account/' + email)
        return account
    },
    getAll: async() => {
        const res = await ApiDatabase.get('/account');
        return res.data
    },
    checkEmail: async(email) => {
        const res = await ApiDatabase.post('/account/checkEmail/' + email);
        return res.data
    },
    create: async(account) => {
        console.log(account)
        const res = await ApiDatabase.post('/account',
            account
        )
        return res
    },
    getByEmail: async(email) => {
        const res = await ApiDatabase.get('/account/' + email)
        return res
    }

}

export default AccountApi