const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    star: {
        type: String,
    },
    voteNum: {
        type: Number,
    },
    isVisible: {
        type: Boolean
    },
    _censorshipId: {
        type: String
    },
    _userId: {
        type: String
    },

}, { timestamps: true }, {
    collection: 'reviews'
});

const ReviewModel = mongoose.model("reviews", reviewSchema);

module.exports = ReviewModel