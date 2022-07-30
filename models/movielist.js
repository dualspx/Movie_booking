const mongoose = require('mongoose')
const Schema = mongoose.Schema
var slugify = require('slugify')

var movieList = new Schema({
    title: {
        type: String
    },
    time: [{
        type:String}],
    genre:[{
        type:String}],
    poster: {
        type: String
    }
})


movieList = mongoose.model("movieList",movieList)
module.exports = movieList

