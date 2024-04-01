import * as dao from "./dao.js";

export default function UserRoutes(app) {
    app.get("/api/users", async (req, res) => {
        const currentUser = req.session["currentUser"];

        // Check to make sure not just anyone can access all users.
        if (!currentUser || currentUser.role !== "ADMIN") {
            res.status(401).send("Unauthorized");
            return;
        }

        const users = await dao.findAllUsers();
        res.json(users);
    });

    app.get("/api/users/:userId", async (req, res) => {
        const userId = req.params.userId;
        const user = await dao.findUserById(userId);
        res.send(user);
    });

    app.post("/api/users", async (req, res) => {
        const user = req.body;
        delete user._id;
        const newUser = await dao.createUser(user);
        res.json(newUser);
    });

    app.put("/api/users/:id", async (req, res) => {
        const id = req.params.id;
        const user = req.body;
        delete user._id;

        // If the current user is logged in and has updated their profile,
        // update the current user information.
        const currentUser = req.session["currentUser"];
        console.log("currentUser = " + JSON.stringify(currentUser));
        if (currentUser) {
            req.session["currentUser"] = user;
        }

        const status = await dao.updateUser(id, user);
        res.json(status);
    });

    app.delete("/api/users/:id", async (req, res) => {
        const id = req.params.id;
        const status = await dao.deleteUser(id);
        res.send(status);
    });

    app.post("/api/users/register", async (req, res) => {
        console.log("[1] register");
        const { username, password } = req.body;
        console.log("[2] username, password", username, password);

        const existingUser = await dao.findUserByCredentials(username, password);
        console.log("[3] existingUser", existingUser);

        if (existingUser) {
            res.status(400).send("Username already exists");
            return;
        }
        
        try {
            const newUser = await dao.createUser({ username, password });
            console.log("[4] newUser", newUser);
            req.session["currentUser"] = newUser;
            console.log("[5] req.session", req.session);
            res.send(newUser);
        } catch (e) {
            console.log("Error Creating User");
        }
    });

    // Profile does not use the database. It is all with the session remembering
    // from one session to the next -- who is logged in.
    app.post("/api/users/profile", async (req, res) => {
        console.log("[6] profile");
        console.log("[7] req.session", req.session);

        if (!req.session.currentUser) {
            console.log("[8] Not logged in");
            res.status(401).send("Not logged in");
            return;
        }

        console.log("[9] req.session.currentUser", req.session.currentUser);
        res.send(req.session.currentUser);
    });

    // Does not have to do with the database.
    app.post("/api/users/logout", async (req, res) => {
        req.session.destroy();
        res.send("Logged out");
    });

    app.post("/api/users/login", async (req, res) => {
        const { username, password } = req.body;
        console.log("username = " + username + ", password = " + password);
        const ewq = await dao.findUserByCredentials(username, password);
        if (ewq) {
            req.session.currentUser = ewq;
            res.send(ewq);
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
};