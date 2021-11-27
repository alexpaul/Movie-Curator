// require the Express package
const { render } = require('ejs')
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

// To extract the Form POST we have to use express.urlencoded() middleware
app.use(express.urlencoded({ extended: true }))

// GET route `/` for the home directory 
app.get('/', (req, res) => {
    res.render('movies/home')
})

// GET route `/movies`
app.get('/movies', async (req, res) => {
    const movies = await Movie.find({})
    // res.render('movies/index', { movies })

    console.log(res.json(movies))
})

// GET route `/movies/new`
app.get('/movies/new', (req, res) => {
    res.render('movies/new')
})

// POST route `/movies`
app.post('/movies', (req, res) => {
    // destructure the following properties from the Request Body
    const { title, year, genre, image, url } = req.body 

    const product = new Movie({
        title: title,
        year: year,
        genre: genre,
        image: image, 
        url: url
    })

    // save the newly created `movie` instance to the database
    product.save()
        .then(response => {
            console.log('Movie was created.')
            console.log(response)
            res.redirect('/movies')
        })
        .catch(error => {
            console.log('Encountered an error while creating the movie.')
            console.log(error)
        })
})

// db.movies.deleteOne({ title: 'White Reindeer'} )