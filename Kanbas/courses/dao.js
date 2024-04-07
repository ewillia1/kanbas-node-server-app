import courseModel from "./model.js";

// CRUD.
// dao shields rest of application from idiosyncrasies from any vender (ex. Mongo) we choose.
// If we swap vendors, we just have to change the dao.
export const createCourse = (course) => {
    return courseModel.create(course);
};

export const findAllCourses = () => {
    return courseModel.find();
};

export const findCourseById = (id) => {
    return courseModel.findById(id);
};

// $set operator patterns matches fields and replaces with new value.
// $set automatically looks for the fields in the new object and compare them
// against the records with the same property and will swap out the values.
export const updateCourse = (id, course) => {
    return courseModel.updateOne({_id: id}, {$set: course});
};

export const deleteCourse = (id) => {
    return courseModel.deletOne({_id: id});
};

// Commented out since I personally do not have fields for department of instructor.
// export const findCourseByDepartment = (department) => courseModel.find({department});
// export const findCourseByInstructor = (instructor) => courseModel.find({instructor});