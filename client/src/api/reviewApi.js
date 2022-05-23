import ApiDatabase from "./ApiDatabase";

const ReviewApi = {
    getAll: async() => {
        const res = await ApiDatabase.get('/review');
        return res
    },

    create: async(review) => {
        const res = await ApiDatabase.post('/review', review)
        return res
    },

    getById: async(id) => {
        const res = await ApiDatabase.get('/review/' + id)
        return res
    },

    update: async(review) => {
        const res = await ApiDatabase.put('/review', review)
        return res
    },

    delete: async(id) => {
        const res = await ApiDatabase.delete('/review/' + id)
        return res
    },

}

export default ReviewApi