import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    course: String
}, { collection: "modules" });
export default moduleSchema;