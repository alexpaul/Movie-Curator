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

1. Close this repo and use the `starter-project` branch. 
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
8. Save the file, run the node server `node index.js` and navigate to the home directory at `localhost:3000` on your Browser. Observe the rendered HTML "Welsome to Movie Curator".
