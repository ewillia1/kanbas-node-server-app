import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("UserModel", schema);      // Create mongoose model from the schema.
export default model;                                   // Export so it can be used elsways.