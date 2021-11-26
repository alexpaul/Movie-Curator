const express = require('express')

const app = express()

const PORT = '3000'

app.listen(PORT, () => {
    console.log(`App is Listening on PORT ${PORT}`)
})

// home route 
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Movie Curator</h1>`)
})