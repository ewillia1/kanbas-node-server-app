import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import cors from "cors";
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import EnrollmentRoutes from './Kanbas/enrollments/routes.js';
import GradeRoutes from './Kanbas/grades/routes.js';
import UserRoutes from './Kanbas/users/routes.js';
import LikesRoutes from "./Napster/likes/routes.js";
import mongoose from 'mongoose';
import session from 'express-session';  // Import express-session for session management.
import dotenv from 'dotenv';            // Import to read .env file.
import QuizRoutes from './Kanbas/quizzes/routes.js';

dotenv.config(); 

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
 
const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,    // Restrict cross origin resource shareing to the react application.
        credentials: true,                   // Support cookies.
    })
);
 
app.use(express.json());
 
// Initialize session middleware. Configure server session AFTER cors.
// sessionOptions = default session options.
const sessionOptions = {
    secret: process.env.SESSION_SECRET,      // Add a secret key for session encryption.
    resave: false,
    saveUninitialized: false
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN
    };
}

app.use(session(sessionOptions));
 
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
GradeRoutes(app);
UserRoutes(app);
LikesRoutes(app);
QuizRoutes(app);
Lab5(app);
Hello(app);
 
app.listen(process.env.PORT || 4000);