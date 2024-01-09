// ****************************JAVASCRIPT LIBRARIES******************************

// *****************************EXTERNAL LIBRARIES*******************************
const {merge} = require('lodash');
// ********************************OWN LIBRARIES*********************************
const courseModel = require("../models/course");
// ******************************************************************************
const resolvers = {
    Query: {
        async getCourses(obj, {page, limit}) {
            try {
                const options = {
                    page: page || 1,
                    limit: limit || 5,
                    sort: { _id: -1 }
                }

                const courses = await courseModel.paginate({}, options);
                return courses.docs;
            } catch (error) {
                return new Error(`There was an error retrieving the courses: ${error}`);
            }
        },
        async getCourse(obj, {id}) {
            try {
                const course = await courseModel.findById(id);
                return course.toObject();
            } catch (error) {
                return new Error(`There was an error retrieving the course: ${error}`);
            }
        }
    },
    Mutation: {
        addCourse(obj, {input}) {
            try {
                const course = new courseModel(input);
                course.save();
                return course.toObject();
            } catch (error) {
                return new Error(`There was an error saving the course: ${error}`);
            }
        },
        async updateCourse(obj, {id, input}) {
            try {
                const courseUpdated = await courseModel.findOneAndUpdate({"_id": id}, input, {new: true})
                return courseUpdated
            } catch (error) {
                return new Error(`There was an error updating the course: ${error}`)
            }
        },
        async deleteCourse(obj, {id}) {
            try {
                const removeCourse = await courseModel.findByIdAndDelete(id);
                return {message: `The course "${removeCourse.title}" was deleted`};
            } catch (error) {
                return new Error(`There was an error deleting the course: ${error}`)
            }
        }
    }
};

module.exports = {
    resolvers
};