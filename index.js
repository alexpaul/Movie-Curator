// require the Express package
const express = require('express')

// get an instance of express()
const app = express()

const PORT = '3000'

// require the Mongoose package
const mongoose = require('mongoose')

// connect to the `movieDB` database, if it does yet exist it will be created
mongoose.connect('mongodb://localhost:27017/movieDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection Open to the Database.')
    })
    .catch((error) => {
        console.log(`Database connection error: ${error}`)
    })

// require the the `Movie` model
const Movie = require('./models/movie')

// Express app is now open for requests on the following PORT
app.listen(PORT, () => {
    console.log(`App is Listening on PORT ${PORT}`)
})

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

// GET route `/` for the home directory 
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Movie Curator</h1>`)
})

// GET route `/movies`
app.get('/movies', async (req, res) => {
    const movies = await Movie.find({})
    res.render('movies/index', { movies })
})