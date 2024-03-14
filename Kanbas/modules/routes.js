import db from "../Database/index.js";

function ModuleRoutes(app) {
    // Route that receives a new module posted from the React.js client application embedded in the Request body.
    // Create a new module object setting its source property to the cid path parameter and push it to the db.modules array.
    // Reply to client with the newly created module.
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.modules.push(newModule);
        res.send(newModule);
    });    

    // Route that retrieves the modules for the course ID encoded in the path (cid).
    // The course ID is parsed from the path and then used to filter the modules for that course.
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules.filter((m) => m.course === cid);
        res.send(modules);
    });
}
export default ModuleRoutes;