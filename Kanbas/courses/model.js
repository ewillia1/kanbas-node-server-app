import mongoose from "mongoose";
import courseSchema from "./schema.js";

// Once you give a model a name (ex. Courses), it is unique.
const courseModel = mongoose.model("Courses", courseSchema);
export default courseModel;