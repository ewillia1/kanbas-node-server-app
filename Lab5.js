const Lab5 = (app) => {                             // Accept app reference to express module.
    app.get("/a5/welcome", (req, res) => {          // Create route to welcome users to assignment 5.
        res.send("Welcome to Assignment 5");        // Here we are using the arrow function syntax.
    });
};
export default Lab5;