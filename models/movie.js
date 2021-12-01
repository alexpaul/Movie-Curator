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

// static method to return a list of genre names 
movieSchema.statics.genreNames = function() {
    const names = [
        'Animation', 'Comedy', 'Family', 'Fantasy', 'Action', 'Adventure', 'Drama',
        'Romance', 'Thriller', 'Horror', 'Mystery', 'Sci-Fi', 'Civil-Rights', 'Crime',
        'Western', 'Biography', 'History', 'Christmas', 'Musical', 'Short', 'Reality-TV', 'GMAX-XMAS'
    ]

    return names
}

// define the Movie Model
const Movie = new mongoose.model('Movie', movieSchema)

// export the Movie model for use in other files as needed
module.exports = Movie