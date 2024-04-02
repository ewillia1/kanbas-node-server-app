import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import cors from "cors";
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import UserRoutes from './Kanbas/users/routes.js';
import LikesRoutes from "./Napster/likes/routes.js";
import mongoose from 'mongoose';
import session from 'express-session'; // Import express-session for session management.
import dotenv from 'dotenv';

dotenv.config(); 

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
 
const app = express();
 
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
 
app.use(express.json());
 
// Initialize session middleware.
app.use(
    session({
        secret: process.env.SESSION_SECRET, // Add a secret key for session encryption.
        resave: false,
        saveUninitialized: false
    })
);
 
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
// LikesRoutes(app);
Lab5(app);
Hello(app);
 
app.listen(process.env.PORT || 4000);