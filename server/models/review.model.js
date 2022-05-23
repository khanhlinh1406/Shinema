const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    pilot: {
        type: String,
    },
    advantage: {
        type: String,
    },
    defect: {
        type: String,
    },
    overview: {
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
    _userId: {
        type: String
    },
    _filmId: {
        type: String
    },

}, { timestamps: true }, {
    collection: 'reviews'
});

const ReviewModel = mongoose.model("reviews", reviewSchema);

module.exports = ReviewModel