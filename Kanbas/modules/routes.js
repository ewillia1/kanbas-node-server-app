import db from "../Database/index.js";

function ModuleRoutes(app) {
    // Route that retrieves the modules for the course ID encoded in the path (cid).
    // The course ID is parsed from the path and then used to filter the modules for that course.
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules.filter((m) => m.course === cid);
        res.send(modules);
    });
}
export default ModuleRoutes;