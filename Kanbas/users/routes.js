import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const findAllUsers = async (req, res) => {
        try {
            const currentUser = req.session["currentUser"];

            // Check to make sure not just anyone can access all users.
            if (!currentUser || currentUser.role !== "ADMIN") {
                res.status(401).send("Unauthorized");
                return;
            }
    
            const users = await dao.findAllUsers();
            res.json(users);
        } catch (e) {
            console.log("Error getting all the users: " + e);
            res.status(400).send("Error getting all the users");
        }
    };

    const findUserById = async (req, res) => { 
        try {
            const userId = req.params.userId;
            const user = await dao.findUserById(userId);
            res.send(user);
        } catch (e) {
            console.log("Error getting a user: " + e);
            res.status(400).send("Error getting a user");
        }
    };

    const createUser = async (req, res) => { 
        try {
            const user = req.body;
            // Get rid of id, to avoid error.
            delete user._id;
            const newUser = await dao.createUser(user);
            res.json(newUser);
        } catch (e) {
            console.log("Error adding user: " + e);
            res.status(400).send("Error adding user");
        }
    };

    const updateUser = async (req, res) => { 
        try {
            const id = req.params.id;
            const user = req.body;
            // Get rid of id, to avoid error.
            delete user._id;
    
            // If the current user is logged in and has updated their profile,
            // update the current user information. Only update the current user
            // if it is the user. If the user is an Admin and is updating some other
            // user, do not switch current user.
            const currentUser = req.session["currentUser"];
            console.log("currentUser = " + JSON.stringify(currentUser));
            if (currentUser._id === id) {
                req.session["currentUser"] = user;
            }
    
            const status = await dao.updateUser(id, user);
            res.json(status);
        } catch (e) {
            console.log("Error updating a user: " + e);
            res.status(400).send("Error updating user");
        }
    };

    const deleteUser = async (req, res) => {
        try {
            const id = req.params.id;
            const status = await dao.deleteUser(id);
            res.send(status);
        } catch (e) {
            console.log("Error deleting a user: " + e);
            res.status(400).send("Error deleting user");
        }
    };

    const registerUser = async (req, res) => {
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
            console.log("Error creating user: " + e);
            res.status(400).send("Error creating user");
        }
    };

    // Profile does not use the database. It is all with the session remembering
    // from one session to the next -- who is logged in.
    const profile = async (req, res) => { 
        console.log("[6] profile");
        console.log("[7] req.session", req.session);

        if (!req.session.currentUser) {
            console.log("[8] Not logged in");
            res.status(401).send("Not logged in");
            return;
        }

        console.log("[9] req.session.currentUser", req.session.currentUser);
        res.send(req.session.currentUser);
    };

    // Does not have to do with the database.
    const logout = async (req, res) => {
        req.session.destroy();
        res.send("Logged out");
    };

    const login = async (req, res) => {
        const { username, password } = req.body;
        console.log("username = " + username + ", password = " + password);
        const ewq = await dao.findUserByCredentials(username, password);
        if (ewq) {
            req.session.currentUser = ewq;
            res.send(ewq);
        } else {
            res.status(401).send("Invalid credentials");
        }
     };

    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.post("/api/users", createUser);
    app.put("/api/users/:id", updateUser);
    app.delete("/api/users/:id", deleteUser);
    app.post("/api/users/register", registerUser);
    app.post("/api/users/profile", profile);    
    app.post("/api/users/logout", logout);
    app.post("/api/users/login", login);
};