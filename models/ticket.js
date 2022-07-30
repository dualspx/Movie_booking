const mongoose = require('mongoose')
const Schema = mongoose.Schema
var slugify = require('slugify')

ticketSchema = new Schema({
    title: String,
    time: String,
    count: Number,
    total: Number,
    poster: String
},{
    timestamps: true
})

Ticket = mongoose.model('Ticket',ticketSchema)
module.exports = Ticket