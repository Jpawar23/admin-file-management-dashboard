const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    FileName: {
        type: String,
        required: true
    },
    SavedFileName: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true
    },
    filesize: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },


},
    { timestamps: true }

);

module.exports = mongoose.model("userdata", fileSchema);