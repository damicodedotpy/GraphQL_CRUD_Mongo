// ****************************JAVASCRIPT LIBRARIES******************************

// *****************************EXTERNAL LIBRARIES*******************************
const { Schema, model } = require("mongoose");
const paginate = require("mongoose-paginate-v2");
// ********************************OWN LIBRARIES*********************************

// ******************************************************************************

const courseSchema = new Schema({
    title: String,
    views: Number,
})

courseSchema.plugin(paginate);

module.exports = model("Course", courseSchema, "courses");