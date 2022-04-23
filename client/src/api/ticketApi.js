import ApiDatabase from "./ApiDatabase";

const TicketApi = {
    getAll: async() => {
        const res = await ApiDatabase.get('/ticket')
        return res.data
    },

    getById: async(id) => {
        const res = await ApiDatabase.get('/ticket/' + id)
        return res.data
    },

    getByUser: async(user) => {
        const res = await ApiDatabase.get('/ticket/user' + user)
        return res.data
    },

    getBookedSeats: async(theaterId, roomId, date, time) => {
        const res = await ApiDatabase.get('/ticket/getBookedSeats/' + theaterId + '/' + roomId + '/' + date + '/' + time);
        return res.data;
    },

    create: async(ticket) => {
        const res = await ApiDatabase.post('/ticket',
            ticket
        )
        return res
    },

    update: async(ticket) => {
        const res = await ApiDatabase.put('/ticket', ticket)
        return res
    },

    deleteById: async(id) => {
        const res = await ApiDatabase.delete('/ticket/' + id)
        return res
    }
}