# Movie Curator

## 1. Objectives

Movie Curator is a Web Application that allows you to Create, Read, Update and Delete movies from a Database.

### RESTful `/movies` Resource Overview 

| Name | Path | Verb | Purpose | Completed |
|:----:|:-----:|:-----:|:----:|:----:|
| Index | `/movies` | GET | display all movies | ✅ |
| New | `/movies/new` | GET | Form to create a new movie | ✅ |
| Create | `/movies` | POST | creates a new movie on the server | ✅ |
| Show | `/movies/:id` | GET | details for a specific movie |  |
| Edit | `/movies/:id/edit` | GET | Form to edit specific movie | ✅ |
| Update | `/movies/:id` | PATCH | updates a specific movie on the server | ✅ |
| Destroy | `/movies/:id` | DELETE | deletes a specific movie on the server |  |

### Technologies that will be used in creating the "Movie Curator" Web Applicatioon

* HTML, CSS, JavaScript, EJS, Bootstrap.
* Node, Express.
* Mongoose, MongoDB.

![Screen Shot 2021-11-26 at 3 49 16 PM](https://user-images.githubusercontent.com/1819208/143637028-b526295a-4161-43a0-893c-51c7c3553807.png)


***

## 2. Project Setup - Express

1. Clone this repo and use the `starter-project` branch then follow the steps below from step 3. 
2. Or you can use `main` and run `node mock-data` then run the server `node index.js` to preview the mock movies data at `localhost:3000/movies`, then you can create movies to your local database at `localhost:3000/movies/new`. Reminder: run `npm install` to add all required Project dependencies.
3. Navigate inside the Project folder in Terminal and run `npm init` to create the `package.json` file. 
4. Install Express `npm i express`. 
5. Install Mongoose `npm i mongoose`. 
6. Install EJS `npm i ejs`. 
7. Create a file called `index.js` in the root directory `touch index.js`. 
8. Edit `index.js` and add the following setup code for Express. 
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
                <img src="<%= movie.image %>">
            <% } %>
        </ul>
    </div>
</body>
</html>
```
7. From now on we will use `nodemon` to run the node server, as it automatially watches and re-runs the node server based on file changes. 
8. Run `nodemon index.js`, if you don't have `nodemon`, run `npm i nodemon`. 
9. You should now be able to see a movie list rendered when you visit `localhost:3000/movies`. 

![Screen Shot 2021-11-26 at 9 03 12 AM](https://user-images.githubusercontent.com/1819208/143592754-e8333229-21b9-4eb5-a12f-be37d3741e65.png)

Congratulation, you are now able to view movies in your Browser from the Mongo database. 🎉

***

## 8. Add some CSS styling to the `GET /movies` route

1. Create a `public` folder in the root directory. 
2. Create a file called `app.css` and save it inside the `public` folder. 
3. Add the following middleware code to `index.js` so Express searches for our CSS files inside the `public` folder. 
```javascript 
app.use(express.static(__dirname + '/public'))
```
4. Create a folder called `partials` inside of the `views` folder.
5. Create a file called `movie-card.ejs` and save it inside the `partials` folder. 
6. Edit the `movie-card.ejs` file as follows:
```javascript
<div id="movie-card">
    <div id="image-container">
        <img src="<%= movie.image %>" alt="">
    </div>
    <div id="movie-info">
        <h2>Title: <%= movie.title %></h2>
        <h2>Year: <%= movie.year %></h2>
        <% let str = '' %>
        <% for(let genre of movie.genre) { %>
            <% str += genre + ' | ' %>
        <% } %>
        <h2><%= `Genre: ${str}` %></h2>
        <h2><a href="<%= movie.url %>">More Info</a></h2>
    </div>
</div>
```
7. Modify the `index.ejs` file as follows: 
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movies</title>
    <!-- include the app.css file located in the `public` folder -->
    <link rel="stylesheet" href="app.css">
</head>
<body>
    <h1>Curated Movies</h1>

    <div>
        <ul>
            <% for(let movie of movies) { %>
                <%# this partial contains the html, css to render a movie card %>
                <%- include('../partials/movie-card', { movie }) %>
            <% } %>
        </ul>
    </div>
</body>
</html>
```
8. Running the server and navigating to `localhost:3000/movies` will render the view seen below.

![Screen Shot 2021-11-26 at 10 31 30 AM](https://user-images.githubusercontent.com/1819208/143603356-7f9973d1-2054-4155-a583-d5cdf5106a04.png)

***

## 9. Create a Movie `GET /movies/new` and `POST /movies` routes

1. Add a new route `GET /movies/new` to `index.js`.
```javascript
// GET route `/movies/new`
app.get('/movies/new', (req, res) => {
    res.render('movies/new')
})
```
2. Create a file called `new.js` and save it to the `movies` folder. 
3. Edit the `new.js` file and add the following code to create a Form and make a POST request to create a movie. 
```javascript 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Enter a New Movie</h1>

    <form action="/movies" method="POST">
        <div>
            <label for="title">Enter Title:</label>
            <input type="text" id="title" name="title">
        </div>

        <br>

        <div>
            <label for="year">Enter Year:</label>
            <input type="text" id="year" name="year">
        </div>

        <br>

        <div>
            <label for="image">Enter Image URL:</label>
            <input type="text" id="image" name="image">
        </div>

        <br>

        <div>
            <label for="url">Enter desired movie link e.g (Rotten Tomatoes, IMDB):</label>
            <input type="text" id="more-info" name="url">
        </div>

        <br>

        <div>
            <fieldset id="genre">
                <legend>Please select the appropriate Genre</legend>
                <label for="Animation">Animation</label>
                <input type="checkbox" value="Animation" name="genre" id="Animation">
                <label for="Comedy">Comedy</label>
                <input type="checkbox" value="Comedy" name="genre" id="Comedy">
                <label for="Family">Family</label>
                <input type="checkbox" value="Family" name="genre" id="Family">
                <label for="Fantasy">Fantasy</label>
                <input type="checkbox" value="Fantasy" name="genre" id="Fantasy">
                <label for="Action">Action</label>
                <input type="checkbox" value="Action" name="genre" id="Action">
                <label for="Adventure">Adventure</label>
                <input type="checkbox" value="Adventure" name="genre" id="Adventure">
                <label for="Drama">Drama</label>
                <input type="checkbox" value="Drama" name="genre" id="Drama">
            </fieldset>
        </div>

        <br>

        <button>Submit</button>
    </form>
</body>
</html>
```

![Screen Shot 2021-11-26 at 2 46 44 PM](https://user-images.githubusercontent.com/1819208/143625671-f246f248-981f-454b-8b84-66d88bd3eade.png)

4. In order to parse POST data from the created form we have to add the following middleware to `index.js`: 
```javascript
// To extract the Form POST we have to use express.urlencoded() middleware
app.use(express.urlencoded({ extended: true }))
```
5. Add the POST route to create a new movie and the appropriate logic: 
```javascript
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
```
6. Navigate to `localhost:3000/movies/new` to start curating new movies to the database. 🎉

***

## 10. Use a Partial EJS file to include a Bootstrap Nav Bar 

1. Create a file called `header.ejs` inside the `partials` folder. 
2. Cut code inside the `home.ejs` file including the opening `body` tag and include this code in the `header.ejs` file. As seen in the code below Bootstrap CSS is included along with a [Bootstrap Nav Bar](https://getbootstrap.com/docs/5.1/components/navbar/).
```javascript 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>

    <%# Bootstrap CSS %>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <link rel="stylesheet" href="app.css">
</head>
<body>

<%# Bootstap Nav Bar %>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Movie Curator</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
          <a class="nav-link" href="/movies">Curated Movies</a>
          <a class="nav-link" href="/movies/new">Add a Movie</a>
        </div>
      </div>
    </div>
</nav>
```
3. Since we removed the header code from `home.ejs` we will now include an EJS partial replacement which has the code associated with `header.ejs`. Also included is the Bootstrap JavaScript needed to implement the collapsable Bootstrap Nav Bar:
```javascript 
<%- include('../partials/header', { title: 'Movie Creator' }) %>

    <h1>Welcome to Movie Curator</h1>

    <div id="home-container">
        <a href="https://youtu.be/vAU7Hp63ceQ"><img src="https://i.ytimg.com/vi/vAU7Hp63ceQ/maxresdefault.jpg" alt=""></a>
    </div>

    <%# Option 1: Bootstrap Bundle with Popper %>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>
```
4. Run the server and observe the now included Nav Bar.

<img width="1587" alt="Screen Shot 2021-11-27 at 5 58 10 PM" src="https://user-images.githubusercontent.com/1819208/143722714-0cdd402d-84b4-4be2-98ee-8e196b510cb7.png">


***

## 11. Bootstrap modified Form for adding a Movie 

```javascript 
<%- include('../partials/header', { title: 'Add a New Movie' }) %>

    <div class="container">

        <h1 class="mb-3">Add a New Movie</h1>

        <form action="/movies" method="POST">
            <div>
                <label for="title" class="form-label">Enter Title:</label>
                <input class="form-control" type="text" id="title" name="title">
            </div>

            <br>

            <div>
                <label class="form-label" for="year">Enter Year:</label>
                <input class="form-control" type="text" id="year" name="year">
            </div>

            <br>

            <div>
                <label class="form-label" for="image">Enter Image URL:</label>
                <input class="form-control" type="text" id="image" name="image">
            </div>

            <br>

            <div>
                <label class="form-label" for="url">Enter desired movie link e.g (Rotten Tomatoes, IMDB):</label>
                <input class="form-control" type="text" id="url" name="url">
            </div>

            <br>

            <div>
                <fieldset id="genre" class="form-control">
                    <legend>Please select the appropriate Genre</legend>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Animation" name="genre" id="Animation">
                        <label class="form-check-label" for="Animation">Animation</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Comedy" name="genre" id="Comedy">
                        <label class="form-check-label" for="Comedy">Comedy</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Family" name="genre" id="Family">
                        <label class="form-check-label" for="Family">Family</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Fantasy" name="genre" id="Fantasy">
                        <label class="form-check-label" for="Fantasy">Fantasy</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Action" name="genre" id="Action">
                        <label class="form-check-label" for="Action">Action</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Adventure" name="genre" id="Adventure">
                        <label class="form-check-label" for="Adventure">Adventure</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Drama" name="genre" id="Drama">
                        <label class="form-check-label" for="Drama">Drama</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Romance" name="genre" id="Romance">
                        <label class="form-check-label" for="Romance">Romance</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Thriller" name="genre" id="Thriller">
                        <label class="form-check-label" for="Thriller">Thriller</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Horror" name="genre" id="Horror">
                        <label class="form-check-label" for="Horror">Horror</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Mystery" name="genre" id="Mystery">
                        <label class="form-check-label" for="Mystery">Mystery</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Sci-Fi" name="genre" id="Sci-Fi">
                        <label class="form-check-label" for="Sci-Fi">Sci-Fi</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Crime" name="genre" id="Crime">
                        <label class="form-check-label" for="Crime">Crime</label>
                    </div>

                </fieldset>
            </div>

            <br>

            <div class="col text-center">
                <button class="btn btn-success">Submit</button>
            </div>
        </form>
    </div>

<%- include('../partials/footer') %>
```

<img width="854" alt="Screen Shot 2021-11-27 at 6 46 46 PM" src="https://user-images.githubusercontent.com/1819208/143723674-ac853a60-cc3e-4bc6-b53f-c97f87c00f35.png">


***

## 12. Adding a Bootstrap Card Style and Instance Method on the `Movie` Schema

1. Modify the `movie-card.ejs` as follows: 
```javascript 
<div class="container">
    <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="<%= movie.image %>" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title mb-5"><%= movie.title %></h5>
              <p class="card-text"><%= movie.year %></p>
              <p class="card-text"><%= movie.formattedGenre() %></p>
              <a href="<%= movie.url %>" class="card-link">More Info</a>
            </div>
          </div>
        </div>
    </div>
</div>
```
2. Add an instance method in `movie.js` on the `movieSchemaa`: 
```javascript
// instance method to return a formatted `genre` String
movieSchema.methods.formattedGenre = function() {
    let str = ''

    for(const [index, value] of this.genre.entries()) {
        str += index !== (this.genre.length - 1) ? `${value} | ` : value
    }

    return str
}
```
3. Save and run the server. Observe the updated changes. 

<img width="1785" alt="Screen Shot 2021-11-28 at 8 05 32 AM" src="https://user-images.githubusercontent.com/1819208/143769027-d2b81d02-3f17-411c-81e7-4cfbaeb4b644.png">

***

## 13. Refactor rendering the radio buttons for the Movie genre

1. Cut out all the `div`s that are rendering radio button in `new.ejs` and replace it with the `for...of` loop below.
```javascript 
<% for(const genre of genreNames) { %>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="<%= genre %>" name="genre" id="<%= genre %>">
        <label class="form-check-label" for="<%= genre %>"><%= genre %></label>
    </div>
<% } %>
```
2. Since we now need `genreNames` passed in update `index.js` GET `/movies/new` route
```javascript
// GET route `/movies/new`
app.get('/movies/new', (req, res) => {
    const genreNames = Movie.genreNames()
    res.render('movies/new', { genreNames })
})
```

***

## 14. Add an Edit Form and `PUT` Update route 

1. Create a file called `edit.ejs` and save it to the `movies` folder. 
2. Edit the `edit.ejs` file as follows: 
```javascript
<%- include('../partials/header', { title: 'Edit Movie' }) %>

    <div class="container">

        <h1 class="mb-3">Edit Movie</h1>

        <form action="/movies/<%= movie.id %>?_method=PUT" method="POST">
            <div>
                <label for="title" class="form-label">Edit Title:</label>
                <input class="form-control" type="text" id="title" name="title" value="<%= movie.title %>">
            </div>

            <br>

            <div>
                <label class="form-label" for="year">Edit Year:</label>
                <input class="form-control" type="text" id="year" name="year" value="<%= movie.year %>">
            </div>

            <br>

            <div>
                <label class="form-label" for="image">Edit Image URL:</label>
                <input class="form-control" type="text" id="image" name="image" value="<%= movie.image %>">
            </div>

            <br>

            <div>
                <label class="form-label" for="url">Edit the movie link e.g (Rotten Tomatoes, IMDB):</label>
                <input class="form-control" type="text" id="url" name="url" value="<%= movie.url %>">
            </div>

            <br>

            <div>
                <fieldset id="genre" class="form-control">
                    <legend>Please select the appropriate Genre</legend>

                    <% for(const genre of genreNames) { %>
                        <div class="form-check">
                            <input class="form-check-input" 
                                type="checkbox"
                                value="<%= genre %>"
                                name="genre" 
                                id="<%= genre %>"
                                <%= movie.genre.includes(genre) ? 'checked' : '' %>
                            >
                            <label class="form-check-label" for="<%= genre %>"><%= genre %></label>
                        </div>
                    <% } %>

                </fieldset>
            </div>

            <br>

            <div class="col text-center mb-5">
                <button class="btn btn-danger">Update</button>
            </div>
        </form>
    </div>

<%- include('../partials/footer') %>
```
3. Since we will be using a Form and by default Forms are only able to POST and GET, we need to install `method-override` package. `npm i method-override`. 
4. Add the following to `index.js`: 
```javascript
// require `method-override` to be able to parse Form data to PUT, DELETE, PATCH
// this is required since Forms can only parse POST and GET by default
const methodOverride = require('method-override')

// override with POST having ?_method=PUT
app.use(methodOverride('_method'))
```
5. Create a route to handle rendering the Edit Form 
```javascript
// GET /movies/:id/edit route to render a Form to edit a movie
app.get('/movies/:id/edit', async (req, res) => {
    const { id } = req.params 

    const movie = await Movie.findById(id)

    const genreNames = Movie.genreNames()

    res.render('movies/edit', { movie, genreNames })
})
```
6. Create a route to handle the logic for updating a movie instance in the database 
```javascript 
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
```
7. Run the server `node index.js` and you will now be able to update a selected movies.

## 15. Filter Movies using Query Parameter 

1. Modify the GET `/movies` route in `index.js`. 
```javascript
// GET route `/movies`
app.get('/movies', async (req, res) => {
    // filter movies if we detect a `genre` query parameter
    // e.g /movies?genre=christmas 
    let { genre } = req.query

    // default query search will return all movies from the database
    let query = {}

    if(genre) {
        genre = genre.charAt(0).toUpperCase() + genre.slice(1)

        // update the query to filter by `genre`
        query = { genre } 
    }

    const movies = await Movie.find(query)

    res.render('movies/index', { movies })

    // for backing up database data in JSON 
    // res.json(movies)
})
```
2. Navigate to `localhost:3000/movies?genre=christmas` and observe the movies will be filtered by the given genre.


## Resources 

* [MDN - Web Development - HTML, CSS and JavaScript](https://developer.mozilla.org/en-US/docs/Learn)
* [Node](https://nodejs.org/en/docs/guides/getting-started-guide/)
* [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
* [Express](http://expressjs.com/en/guide/routing.html)
* [Mongoose](https://mongoosejs.com/)
* [EJS](https://ejs.co/)
* [MongoDB Compass - GUI for MongoDB](https://www.mongodb.com/products/compass)
* [StackOverflow - When do I use path params vs. query params in a RESTful API?](https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api)

## Troubleshooting 

* If you're having database connection issues try resolving from `localhost` to `127.0.0.1` instead.
* Also run `db.getMongo()` will resolve the IP and Port number e.g `127.0.0.1:27017`.
* [StackOverflow: MongoDB Startup Errors](https://stackoverflow.com/questions/41615574/mongodb-server-has-startup-warnings-access-control-is-not-enabled-for-the-dat)

