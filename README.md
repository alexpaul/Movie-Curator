# Movie Curator

## 1. Objectives

Movie Curator is a Web Application that allows you to Create, Read, Update and Delete movies from a Database.

### RESTful `/movies` Resource Overview 

| Name | Path | Verb | Purpose | Completed |
|:----:|:-----:|:-----:|:----:|:----:|
| Index | `/movies` | GET | display all movies |  |
| New | `/movies/new` | GET | Form to create a new movie |  |
| Create | `/movies` | POST | creates a new movie on the server |  |
| Show | `/movies/:id` | GET | details for a specific movie |  |
| Edit | `/movies/:id/edit` | GET | Form to edit specific movie |  |
| Update | `/movies/:id` | PATCH | updates a specific movie on the server |  |
| Destroy | `/movies/:id` | DELETE | deletes a specific movie on the server |  |

### Technologies that will be used in creating the "Movie Curator" Web Applicatioon

* HTML, CSS, JavaScript, EJS, Bootstrap.
* Node, Express.
* Mongoose, MongoDB.

***

## 2. Project Setup - Express

1. Clone this repo and use the `starter-project` branch. 
2. Navigate inside the Project folder in Terminal and run `npm init` to create the `package.json` file. 
3. Install Express `npm i express`. 
4. Install Mongoose `npm i mongoose`. 
5. Install EJS `npm i ejs`. 
6. Create a file called `index.js` in the root directory `touch index.js`. 
7. Edit `index.js` and add the following setup code for Express. 
```javascript
// require the Express package
const express = require('express')

// get an instance of express()
const app = express()

const PORT = '3000'

// Express app is now open for requests on the following PORT
app.listen(PORT, () => {
    console.log(`App is Listening on PORT ${PORT}`)
})

// GET route `/` for the home directory 
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Movie Curator</h1>`)
})
```
8. Save the file, run the node server `node index.js` and navigate to the home directory at `localhost:3000` on your Browser. Observe the rendered HTML "Welcome to Movie Curator".

***

## 3. MongoDB setup 

1. Start the MongoDB service in Terminal `brew services start mongodb-community@5.0`. 
2. Run the MongoDB shell `mongo`. 
3. Ensure `mongo` is running by typing `show dbs` in the shell, this will list all existing databases. 

For more on MongoDB installation start [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/).

***

## 4. Create the `Movie` Model 

1. Create a folder called `models`. 
2. Create a file called `movie.js` and save it in the `models` folder. 
3. Define the Schema, Model and export `Movie` from the `movie.js` file. 
```javascript 
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

// define the Movie Model
const Movie = new mongoose.model('Movie', movieSchema)

// export the Movie model for use in other files as needed
module.exports = Movie
```

***

## 5. Setup Mongoose in the Project and test creating and saving a Movie to the Database

1. Setup Mongoose in `index.js`
```javascript 
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
```
2. Reqire the `Movie` model 
```javascript 
// require the the `Movie` model
const Movie = require('./models/movie')
```
3. Create a `Movie` instance.
```javascript
const movie = new Movie({ title: '8-Bit Christmas',
                          year: 2021,
                          genre: ['Comedy', 'Family', 'Fantasy'],
                          image: 'https://www.imdb.com/title/tt11540284/mediaviewer/rm3072715265/?ref_=tt_ov_i',
                          url: 'https://www.imdb.com/title/tt11540284/?ref_=nv_sr_srsg_0' })
```
4. Save the `Movie` instance to the database. 
```javascript
movie.save()
    .then(res => {
        console.log('Movie was successfully saved to the database.')
        console.log(res)
    })
    .catch(error => {
        console.log('An error was encountered while saving the movie.')
        console.log(error)
    })
```
5. Run the node server `node index.js`.
``` 
App is Listening on PORT 3000
Connection Open to the Database.
Movie was successfully saved to the database.
{
  title: '8-Bit Christmas',
  year: 2021,
  genre: [ 'Comedy', 'Family', 'Fantasy' ],
  image: 'https://www.imdb.com/title/tt11540284/mediaviewer/rm3072715265/?ref_=tt_ov_i',
  url: 'https://www.imdb.com/title/tt11540284/?ref_=nv_sr_srsg_0',
  _id: new ObjectId("61a0d54f3f9f725e653c4b63"),
  __v: 0
}
```
6. Verify the `Movie` was saved to the database, first ensure you run `mongo` and the Terminal shell window is active. Best to have 2 Terminal windows opened. One for running `mongo` commands and the second for running `node` server commands. 
7. Enter `show dbs` in the `mongo` shell, at this point you should be able to see `movieDB` listed. 
8. Enter `use movieDB` in order to switch and start using the database. 
9. Enter `db` this will show you the current database, in our case this will be `movieDB`.
10. Run `show collections`, this will list all collections that belong to the `movieDB` database. `movies` should be listed. 
11. Run `db.movies.find()` to list all movies. You should now have at least one movie entry. 
```
{ "_id" : ObjectId("61a0d54f3f9f725e653c4b63"), "title" : "8-Bit Christmas", "year" : 2021, "genre" : [ "Comedy", "Family", "Fantasy" ], "image" : "https://www.imdb.com/title/tt11540284/mediaviewer/rm3072715265/?ref_=tt_ov_i", "url" : "https://www.imdb.com/title/tt11540284/?ref_=nv_sr_srsg_0", "__v" : 0 }
```

Awesome, we now have Express, Mongoose and MongoDB all connected in our app. 🎉


