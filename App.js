const express = require('express')                              // Equivalent to import.
const app = express()                                           // Create new express instance.
// app.get('/hello', (req, res) => {res.send('Hello World!')})
app.get('/hello', (req, res) => {res.send('Life is good!')})
app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.listen(4000)                                                // Listen to http://localhost:4000