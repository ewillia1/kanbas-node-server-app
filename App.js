// const express = require('express')                              // Equivalent to import.
import express from 'express';                                  // Now we can use import syntax instead of require.
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import cors from "cors";                                        // Import cors library.

const app = express();                                          // Create new express instance.
app.use(cors());                                                // Make sure cors is used right after creating the app express instance.
app.use(express.json());                                        // Make sure this statement occurs AFTER setting up CORS.
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(4000);                                               // Listen to http://localhost:4000