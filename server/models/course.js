const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const courseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    score: Number,
});

courseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Course", courseSchema);