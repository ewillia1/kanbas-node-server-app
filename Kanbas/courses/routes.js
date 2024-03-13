import Database from "../Database/index.js";

function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });
}
export default CourseRoutes;