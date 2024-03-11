const assignment = {                                // Object state persists as long as server is running. Changes to the object perseist. Rebooting server resets the object.
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};

const module = {
    id: "M1A101", name: "Module 1", description: "This is the description for module 1.", course: "A101"
};

const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
];

const Lab5 = (app) => {                             // Accept app reference to express module.
    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedBool = completed === "true";
            const completedTodos = todos.filter((t) => t.completed === completedBool);
            res.json(completedTodos);
            return;
        }

        res.json(todos);
    });

    // Retrieve particular item from an array by its primary key, e.g., its ID property.
    // The convention is to encode the ID of the item of interest as a path parameter.
    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
    });    

    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);                       // Use .json() instead of .send() if you know the response is formatted as JSON.
    });

    app.get("/a5/assignment/title", (req, res) => {     // Respond with string property/
        res.json(assignment.title);                     // Can do the same with other properties.
    });   
    
    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;            // Changes to objects in the server
        assignment.title = newTitle;                // persist as long as the server is running.
        res.json(assignment);                       // Rebooting the server resets the object state.
    }); 

    app.get("/a5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
    }); 

    app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
        const { newCompleted } = req.params;
        assignment.completed = newCompleted;
        res.json(assignment);
    }); 
    
    app.get("/a5/module", (req, res) => {
        res.json(module);                       // Use .json() instead of .send() if you know the response is formatted as JSON.
    });

    app.get("/a5/module/name", (req, res) => {     // Respond with string property/
        res.json(module.name);                     // Can do the same with other properties.
    });   
    
    app.get("/a5/module/name/:newName", (req, res) => {
        const { newName } = req.params;            // Changes to objects in the server
        module.name = newName;                // persist as long as the server is running.
        res.json(module);                       // Rebooting the server resets the object state.
    }); 

    app.get("/a5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    }); 

    app.get("/a5/welcome", (req, res) => {          // Create route to welcome users to assignment 5.
        res.send("Welcome to Assignment 5");        // Here we are using the arrow function syntax.
    });

    app.get("/a5/add/:a/:b", (req, res) => {        // Route expexts 2 path parameters after /a5/add
        const { a, b } = req.params;                // Retrieve path parameters as strings.
        const sum = parseInt(a) + parseInt(b);      // Parse as integers and adds.
        res.send(sum.toString());                   // Sum as string sent back as response.
    });                                             // Don't send integers since they can be interpreted as status.

    app.get("/a5/subtract/:a/:b", (req, res) => {   // Route expects 2 path parameters after /a5/subtract
        const { a, b } = req.params;                // Retrieve path parameters as strings.
        const sum = parseInt(a) - parseInt(b);      // Parse as integers and subtracts.
        res.send(sum.toString());                   // Subtraction as string sent back as response.
    });                                             // Response is converted to string otherwise browser would interpret integer response as a status code.

    app.get("/a5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) * parseInt(b);
        res.send(sum.toString());
    });

    app.get("/a5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) / parseInt(b);
        res.send(sum.toString());
    });

    app.get("/a5/calculator", (req, res) => {       // e.g., a5/calculator?a=5&b=2&operation=add
        const { a, b, operation } = req.query;      // Retrieve a, b, and operation parameters in query.
        let result = 0;
        switch (operation) {
            case "add":
                result = parseInt(a) + parseInt(b);     // Parse as integers since parameters are strings.
                break;
            case "subtract":
                result = parseInt(a) - parseInt(b);
                break;
            case "multiply":
                result = parseInt(a) * parseInt(b);
                break;
            case "divide":
                result = parseInt(a) / parseInt(b);
                break;
            default:
                result = "Invalid operation";
        }
        res.send(result.toString());                // Convert to string otherwise browser interprets as a status code.
    });
};
export default Lab5;