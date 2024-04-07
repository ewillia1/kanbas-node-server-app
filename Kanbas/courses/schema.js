import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    id: String,
    name: String,
    semester: String,
    startDate: Date,
    endDate: Date,
    image: String,
}, { collection: "courses" });
export default courseSchema;