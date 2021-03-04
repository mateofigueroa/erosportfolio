const { Schema, model } = require('mongoose');


const Introduction = new Schema({
    title: String,
    description: String
})

module.exports = model('Introduction', Introduction);