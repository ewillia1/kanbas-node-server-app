import mongoose from "mongoose";
import courseSchema from "./schema.js";

// Once you give a model a name (ex. Course), it is unique.
const courseModel = mongoose.model("Course", courseSchema);
export default courseModel;