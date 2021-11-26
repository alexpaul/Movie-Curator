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
{ "_id" : ObjectId("61a0d54f3f9f725e653c4b63"),
  "title" : "8-Bit Christmas",
  "year" : 2021,
  "genre" : [ "Comedy", "Family", "Fantasy" ],
  "image" : "https://www.imdb.com/title/tt11540284/mediaviewer/rm3072715265/?ref_=tt_ov_i",
  "url" : "https://www.imdb.com/title/tt11540284/?ref_=nv_sr_srsg_0", "__v" : 0
}
```

Awesome, we now have Express, Mongoose and MongoDB all connected in our app. 🎉

***

## 6. Refactor our application to create mock Movie data in the database 

1. Stop the server if it is currently running `Ctrl+C`. 
2. Remove the code that creates and saves an instance of a Movie from `index.js`. 
3. `index.js` should now look like the following: 
```javascript
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
```
4. Create a new file called `mock-data.js` and add the following mock data to it:
```javascript
/*
Before running this script perform the following MongoDB commands: 
1. Ensure the `mongo` shell is running.
2. Run `db` to verify which database you're currently running.
3. If you're not in the `movieDB`, the run `use movieDB` to switch to it. 
4. Run `show collections` to list all collections, if `movies` does not exist, move to step 7.
5. Run `db.movies.drop()` to remove the `movies` collection.
6. Verify the `movies` collection no longer exist by running `show collections`.
7. Run `node mock-data` to insert the movies in this script. 
8. Verify the movies were inserted into the database: 
9. Run `db.movieDB.find()`, if all went well you should now have at least 4 movies.
*/

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

const Movie = require('./models/movie')

const movies = [
    { 
        title: '8-Bit Christmas',
        year: 2021,
        genre: ['Comedy', 'Family', 'Fantasy'],
        image: 'https://www.imdb.com/title/tt11540284/mediaviewer/rm3072715265/?ref_=tt_ov_i',
        url: 'https://www.imdb.com/title/tt11540284/?ref_=nv_sr_srsg_0' 
    },
    { 
        title: 'Kung Fu Panda',
        year: 2008,
        genre: ['Action', 'Adventure', 'Animation'],
        image: 'https://www.imdb.com/title/tt0441773/mediaviewer/rm3096332288/?ref_=tt_ov_i',
        url: 'https://www.imdb.com/title/tt0441773/?ref_=fn_al_tt_1' 
    },
    { 
        title: 'James and the Giant Peach',
        year: 1996,
        genre: ['Animation', 'Family', 'Adventure'],
        image: 'https://www.imdb.com/title/tt0116683/mediaviewer/rm4238147840/?ref_=tt_ov_i',
        url: 'https://www.imdb.com/title/tt0116683/?ref_=fn_al_tt_1' 
    },
    { 
        title: 'Klaus',
        year: 2019,
        genre: ['Animation', 'Comedy', 'Adventure'],
        image: 'https://www.imdb.com/title/tt4729430/mediaviewer/rm1843825409/?ref_=tt_ov_i',
        url: 'https://www.imdb.com/title/tt4729430/?ref_=fn_al_tt_1' 
    }
]

Movie.insertMany(movies)
    .then((res) => {
        console.log('Movies entered into the database successfully.')
        console.log(res)
    })
    .catch((error) => {
        console.log('Encountered and error while inserting movies.')
        console.log(error)
    })
```
5. Follow the steps in the `mock-data.js` file. 
6. You should now have `movies` data, verify by running `db.movies.find()` in a `mongo` shell.

***

## 7. Show all Movies route `GET /movies`

1. Create a folder called `views`. 
2. Create a folder called `movies` inside of the `views` folder. 
3. Create a file called `index.ejs` and save it inside the `movies` folder. 
4. Create a `GET /movies` route in the `index.js` file.
```javascript 
// GET route `/movies`
app.get('/movies', async (req, res) => {
    const movies = await Movie.find({})
    res.render('movies/index', { movies })
})
```
5. We will be using EJS for adding JavaScript templating code to our app, add the following to `index.js`
```javascript
app.set('view engine', 'ejs')
```
6. Add the following code to render a movie list to `index.ejs`.
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movies</title>
</head>
<body>
    <h1>Curated Movies</h1>

    <div>
        <ul>
            <% for(let movie of movies) { %>
                <li><%= movie.title %></li>
            <% } %>
        </ul>
    </div>
</body>
</html>
```
7. From now on we will use `nodemon` to run the node server, as it automatially watches and re-runs the node server based on file changes. 
8. Run `nodemon index.js`, if you don't have `nodemon`, run `npm i nodemon`. 
9. You should now be able to see a movie list rendered when you visit `localhost:3000/movies`. 

![Screen Shot 2021-11-26 at 8 46 39 AM](https://user-images.githubusercontent.com/1819208/143590416-95075ab2-15a5-4f06-9516-b1b19f3ebef4.png)

Congratulation, you are now able to view movies in your Browser from the Mongo database. 🎉
![Screen Shot 2021-11-26 at 8 46 39 AM](https://user-images.githubusercontent.com/1819208/143590416-95075ab2-15a5-4f06-9516-b1b19f3ebef4.png)


