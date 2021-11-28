// require the Mongoose package
const mongoose = require('mongoose')

// define the Movie Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true
    }, 
    image: {
        type: String,
        required: true
    }, 
    url: {
        type: String, 
        required: true
    }
})

// instance method to return a formatted `genre` String
movieSchema.methods.formattedGenre = function() {
    let str = ''

    for(const [index, value] of this.genre.entries()) {
        str += index !== (this.genre.length - 1) ? `${value} | ` : value
    }

    return str
}

// define the Movie Model
const Movie = new mongoose.model('Movie', movieSchema)

// export the Movie model for use in other files as needed
module.exports = Movie