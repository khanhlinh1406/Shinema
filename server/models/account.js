const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shinema_db:ThucLinh123@cluster0.leaz1.mongodb.net/Shinema?retryWrites=true&w=majority')
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected !")
})
mongoose.connection.on("error", () => {
    console.log("Connect MongoDB Failed !")
})

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: String,
    password: String
}, {
    collection: 'account'
});

const AccountModel = mongoose.model('account', AccountSchema)

module.exports = AccountModel
