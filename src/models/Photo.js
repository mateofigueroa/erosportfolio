const { Schema, model } = require('mongoose');


const Photo = new Schema({
    title: String,
    description: String,
    name: String,
    technique: String,
    size: String,
    date: String,
    imageURL: String,
    public_id: String
})

module.exports = model('Photo', Photo);