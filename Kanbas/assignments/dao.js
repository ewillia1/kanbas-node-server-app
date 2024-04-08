import assignmentModel from "./model.js";

export const createAssignment = (assignment) => {
    return assignmentModel.create(assignment);
};

export const findAssignmentsForCourse = (courseId) => {
    try {
        const assigments = assignmentModel.find({ course: courseId});
        return assigments;
    } catch (error) {
        console.error("Error finding assignments: ", error);
        throw new Error("Failed to find assignments");
    }
};

export const findAssignmentById = (assignmentId) => {
    return assignmentModel.findById(assignmentId);
};

export const updateAssignment = (assignmentId, assignment) => {
    return assignmentModel.updateOne({_id: assignmentId}, {$set: assignment});
};

export const deleteAssignment = (assignmentId) => {
    return assignmentModel.deleteOne({_id: assignmentId});
};