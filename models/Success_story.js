const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    service: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    provider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true,
    },
}, { timestamps: true }); 

const SuccessStory = mongoose.model('SuccessStory', successStorySchema);

module.exports = SuccessStory;
