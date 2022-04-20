const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    id: {
        type: String,
        required: true
    },

    _filmId: {
        type: String,
        required: true
    },

    _theaterId: {
        type: String,
        required: true
    },

    _roomId: {
        type: String,
        required: true
    },

    seatId: {
        type: String,
        required: true
    },

    occurAt: {
        type: String,
        required: true
    },

    _userId: {
        type: String,
        required: true
    },

    bookedTime: {
        type: String,
        required: true
    },

    isCancelled: {
        type: Boolean,
        required: true,
        default: false
    },

    invoice: {
        id: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        total: {
            type: Number,
            required: true
        },

        // _discountId: {
        //     type: String,
        //     default: ''
        // },

        // discountMoney: {
        //     type: Number,
        //     default: 0
        // },

        method: {
            type: String,
            required: true,
            default: 'Cash'
        }
    }
}, { timestamps: true }, {
    collection: 'ticket'
});

const TicketModel = mongoose.model('ticket', TicketSchema);

module.exports = TicketModel;