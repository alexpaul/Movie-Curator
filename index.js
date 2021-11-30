// require the Express package
const { render } = require('ejs')
const express = require('express')

// get an instance of express()
const app = express()

const PORT = '3000'

// require `method-override` to be able to parse Form data to PUT, DELETE, PATCH
// this is required since Forms can only parse POST and GET by default
const methodOverride = require('method-override')

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

// override with POST having ?_method=PUT
app.use(methodOverride('_method'))

// To extract the Form POST we have to use express.urlencoded() middleware
app.use(express.urlencoded({ extended: true }))

// GET route `/` for the home directory 
app.get('/', (req, res) => {
    res.render('movies/home')
})

// GET route `/movies`
app.get('/movies', async (req, res) => {
    const movies = await Movie.find({})
    res.render('movies/index', { movies })

    // res.json(movies)
})

// GET route `/movies/new`
app.get('/movies/new', (req, res) => {
    const genreNames = Movie.genreNames()
    res.render('movies/new', { genreNames })
})

// POST route `/movies`
app.post('/movies', (req, res) => {
    // destructure the following properties from the Request Body
    const { title, year, genre, image, url } = req.body 

    const movie = new Movie({
        title: title,
        year: year,
        genre: genre,
        image: image, 
        url: url
    })

    // save the newly created `movie` instance to the database
    movie.save()
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

// GET /movies/:id/edit route to render a Form to edit a movie
app.get('/movies/:id/edit', async (req, res) => {
    const { id } = req.params 

    const movie = await Movie.findById(id)

    const genreNames = Movie.genreNames()

    res.render('movies/edit', { movie, genreNames })
})

// PUT /movies/:id route to handle update logic
app.put('/movies/:id', async (req, res) => {
    console.log('in update route')

    const { id } = req.params 

    const { title, year, image, url, genre } = req.body

    const movie = await Movie.findByIdAndUpdate(
        id,
        {
            title: title,
            year: year,
            image: image,
            url: url,
           genre: genre 
        }
    )

    res.redirect('/movies')
})