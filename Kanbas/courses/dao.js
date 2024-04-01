import courseModel from "./model.js";

// CRUD.
// dao shields rest of application from idiosyncrasies
// from any vender we choose.
export const findAllCourses = () => {
    return courseModel.find();
};

export const findCourseById = (id) => {
    return courseModel.findById(id);
};

// export const findCourseByDepartment = (department) => courseModel.find({department});
// export const findCourseByInstructor = (instructor) => courseModel.find({instructor});

export const createCourse = (course) => {
    return courseModel.create(course);
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