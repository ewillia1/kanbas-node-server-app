import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    id: String,
    student: String,
    assignment: String,
    grade: String
}, { collection: "grades" });
export default gradeSchema;