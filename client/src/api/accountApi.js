import Api from ".";

const url = '/account'
const AccountApi = {
    getAll: async () => {
        const res = await Api.get(url + '/');
        return res.data
    },
}

export default AccountApi