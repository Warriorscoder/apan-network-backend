const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    site_url: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;
