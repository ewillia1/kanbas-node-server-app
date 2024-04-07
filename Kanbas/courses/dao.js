import courseModel from "./model.js";

// CRUD.
// dao shields rest of application from idiosyncrasies from any vender (ex. Mongo) we choose.
// If we swap vendors, we just have to change the dao.

export const createCourse = (course) => {
    return courseModel.create(course);
};

// What courseModel.find returns is not the actual courses. It returns a promise that
// you can then register and then it calls you back.
export const findAllCourses = () => {
    return courseModel.find();
};

export const findCourseById = (courseId) => {
    return courseModel.findById(courseId);
};

// $set operator patterns matches fields and replaces with new value.
// $set automatically looks for the fields in the new object and compare them
// against the records with the same property and will swap out the values.
export const updateCourse = (courseid, course) => {
    return courseModel.updateOne({_id: courseid}, {$set: course});
};

export const deleteCourse = (courseid) => {
    return courseModel.deleteOne({_id: courseid});
};

// Commented out since I personally do not have fields for department of instructor.
// export const findCourseByDepartment = (department) => courseModel.find({department});
// export const findCourseByInstructor = (instructor) => courseModel.find({instructor});