const mongoose = require('mongoose');

let roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

var role = mongoose.model('Role', roleSchema);

module.exports = role;