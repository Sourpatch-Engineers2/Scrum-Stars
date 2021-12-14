const mongoose = require('mongoose')

/**
 * @description mongoose uses model schemas to push and get data and this is the layout as seen in the database
 */
const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        required: true
    },
    scrumMaster: {
        type: String,
        required: true
    },
    totalMembers: {
        type: Number,
        required: true
    },

    sprints: {
        type: Array,
    }
    
})

module.exports = mongoose.model('Team', TeamSchema)