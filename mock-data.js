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
        image: 'https://resizing.flixster.com/LzA0xwxtXvQ2G_CdpwtaDTzuC3w=/206x305/v2/https://resizing.flixster.com/oVxQtI5DE4CcNiKEm3x9l8OyARc=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzE3YmMxMjJmLTc1ZjMtNDc5Mi1hYjE2LWY2N2IxYjJmZmI1ZC5qcGc=',
        url: 'https://www.imdb.com/title/tt11540284/?ref_=nv_sr_srsg_0' 
    },
    { 
        title: 'Kung Fu Panda',
        year: 2008,
        genre: ['Action', 'Adventure', 'Animation'],
        image: 'https://resizing.flixster.com/1GJzyEVS8LieIFF6YJHcxLcrfOM=/206x305/v2/https://flxt.tmsimg.com/NowShowing/64718/64718_aa.jpg',
        url: 'https://www.imdb.com/title/tt0441773/?ref_=fn_al_tt_1' 
    },
    { 
        title: 'James and the Giant Peach',
        year: 1996,
        genre: ['Animation', 'Family', 'Adventure'],
        image: 'https://resizing.flixster.com/jgDY8SqhiU26Bt_V8NVmSrPvgUw=/206x305/v2/https://flxt.tmsimg.com/assets/p17892_p_v8_ad.jpg',
        url: 'https://www.imdb.com/title/tt0116683/?ref_=fn_al_tt_1' 
    },
    { 
        title: 'Klaus',
        year: 2019,
        genre: ['Animation', 'Comedy', 'Adventure'],
        image: 'https://resizing.flixster.com/eAEXkTkAtYAzAhT5WLhxRSZHkPc=/206x305/v2/https://resizing.flixster.com/rP7lnn4r40j3Q6YRH0ycZLmaBbU=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzL2ZkYmI5YmNhLTNhNDctNDA2Zi1hZTQwLWJiZTU2YWY5N2EwOC53ZWJw',
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