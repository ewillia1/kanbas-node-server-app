import Database from "../Database/index.js";

function CourseRoutes(app) {
    // Route that creates a new course and adds it to the Database.
    // New course is passed into the HTTP body from the client and is appended to the end of the courses array in the Dashboard.
    // New course is given a new unique identifier and sent back to the client in the response.
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body, _id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
    });

    // Route that makes courses available at http://localhost:4000/api/courses.
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });
}
export default CourseRoutes;