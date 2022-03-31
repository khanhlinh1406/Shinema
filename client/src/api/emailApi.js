import ApiAuthen from "./ApiAuthen";
import ApiDatabase from "./ApiDatabase";

const EmailApi = {
    sendVerify: async(option) => {
        const res = await ApiDatabase.get('/account', {
            option: option
        });
        return res.data
    },

}

export default AccountApi