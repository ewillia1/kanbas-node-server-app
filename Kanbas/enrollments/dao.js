import enrollmentModel from "./model.js";

export const createEnrollment = (enrollment) => {
    return enrollmentModel.create(enrollment);
};

export const findEnrollmentsForCourse = (courseId) => {
    const enrollments = enrollmentModel.find({ course: courseId});
    return enrollments;
};

export const findEnrollmentById = (enrollmentId) => {
    return enrollmentModel.findById(enrollmentId);
};

export const updateEnrollment = (enrollmentId, enrollment) => {
    return enrollmentModel.updateOne({_id: enrollmentId}, {$set: enrollment});
};

export const deleteEnrollment = (enrollmentId) => {
    return enrollmentModel.deleteOne({_id: enrollmentId});
};