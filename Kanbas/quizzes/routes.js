import db from "../Database/index.js";

function QuizRoutes(app) {
    // Route that retrieves the quizzes for the course ID encoded in the path (cid).
    // The course ID is parsed from the path and then used to filter the quizzes for that course.
    const fetchQuizzesForCourse = async (req, res) => {
        console.log("fetching quizzes");
        const { cid } = req.params;
        console.log("cid = " + cid);

        const searchTerm = req.query.q; // Retrieve the search term from the query parameters.
        console.log("searchTerm = " + searchTerm);
        try {
            let quizzes = db.quizzes.filter((q) => q.course === cid);
    
            // If there is a search term, filter quizzes based on the title containing the search term.
            if (searchTerm) {
                quizzes = quizzes.filter((q) => q.title.includes(searchTerm));
            }
    
            console.log("quizzes = " + JSON.stringify(quizzes));
            res.send(quizzes);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            res.status(500).send("Internal Server Error");
        }
    };

    // Route that receives a new quiz posted from the React.js client application embedded in the Request body.
    // Create a new quiz object setting its source property to the cid path parameter and push it to the db.quizzes array.
    // Reply to client with the newly created quiz.
    const createNewQuiz = async (req, res) => {
        const { cid } = req.params;
        const newQuiz = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.quizzes.push(newQuiz);
        res.send(newQuiz);
    };

    // Route that handles an HTTP PUT request with the quiz's ID embedded in the path and that updates in the HTTP body.
    // Parse the quiz's ID from the request parameters, find the quiz in the database, and then update corresponding quiz
    // with values in the request body.
    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
        db.quizzes[quizIndex] = {...db.quizzes[quizIndex], ...req.body};
        if (!db.quizzes) {
            res.status(404).json({ message: `Unable to update Quiz with ID ${qid}` });
        }
        res.sendStatus(204);
    };

    // Route that handles an HTTP DELETE method with the quiz's ID embedded in the URL.
    // qid request parameter is used to filter out the quiz from the quizzes array in the database.
    // Respond with a 200 status signifying success.
    // Return a 404 if the quiz is not found.
    const deleteQuiz = async (req, res) => {
        console.log("in routes.js. delete");
        const { qid } = req.params;
        console.log("qid = '" + qid + "'");
        db.quizzes = db.quizzes.filter((q) => q._id !== qid);
        console.log("db.quizzes = " + JSON.stringify(db.quizzes));
        if (!db.quizzes) {
            res.status(404).json({ message: `Unable to delete Quiz with ID ${qid}` });
        }
        res.sendStatus(200);
    };
    
    app.get("/api/courses/:cid/quizzes", fetchQuizzesForCourse);   
    app.post("/api/courses/:cid/quizzes", createNewQuiz); 
    app.put("/api/quizzes/:qid", updateQuiz);
    app.delete("/api/quizzes/:qid", deleteQuiz);
}
export default QuizRoutes;