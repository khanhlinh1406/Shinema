const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    name: String,
    contact: String,
    identifyNumber: String,
    address: String,
    birthday: String,
    email: String,
    password: String,
    rank: String,
    score: Number,
    listTicketId: Array,
    listReview: Array,
}, {
    collection: 'account'
});

const AccountModel = mongoose.model('account', AccountSchema)

module.exports = AccountModel
