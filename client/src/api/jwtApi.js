import Api from ".";

const JWTApi = {
    getAllToken: async() => {
        const res = await Api.get('/getAllToken');
        return res.data
    },

    addToken: async() => {
        const res = await Api.get('/addToken');
        return res.data
    },

    deleteToken: async() => {
        const res = await Api.get('/deleteToken');
        return res.data
    },
}

export default JWTApi