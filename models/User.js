const mongoose = require('mongoose')

/**
 * @description mongoose uses model schemas to push and get data and this is the layout as seen in the database
 */
const UserSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)