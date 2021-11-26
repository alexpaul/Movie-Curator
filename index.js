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

// GET route `/` for the home directory 
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Movie Curator</h1>`)
})

const movie = new Movie({ title: '8-Bit Christmas',
                          year: 2021,
                          genre: ['Comedy', 'Family', 'Fantasy'],
                          image: 'https://www.imdb.com/title/tt11540284/mediaviewer/rm3072715265/?ref_=tt_ov_i',
                          url: 'https://www.imdb.com/title/tt11540284/?ref_=nv_sr_srsg_0' })


movie.save()
    .then(res => {
        console.log('Movie was successfully saved to the database.')
        console.log(res)
    })
    .catch(error => {
        console.log('An error was encountered while saving the movie.')
        console.log(error)
    })