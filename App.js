// const express = require('express')                              // Equivalent to import.
import express from 'express';                                  // Now we can use import syntax instead of require.
import Hello from "./Hello.js"

const app = express()                                           // Create new express instance.
Hello(app)
app.listen(4000)                                                // Listen to http://localhost:4000