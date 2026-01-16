const Fileuploader = require("../models/files.model");
const path = require("path");
const fs = require("fs");
const createfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        // Save file info in DB
        const upload = await Fileuploader.create({
            FileName: req.file.originalname,
            SavedFileName: req.file.filename,
            // URL: req.file.filename, // If you serve static files
            URL: `/uploads/${req.file.filename}`, // If you serve static files
            filesize: req.file.size,
            mimetype: req.file.mimetype,
        });

        res.status(201).json({
            success: true,
            message: "File uplaoded succesfully!",
            data: upload
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}


// get all files
const getAllFiles = async (req, res) => {
    try {

        const files = await Fileuploader.find();
        res.json({
            success: true,
            message: "",
            data: files,
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message

        })
    }
}


// get files by id
const getfilebyid = async (req, res) => {

    try {
        const filedata = await Fileuploader.findById(req.params.id);
        if (!filedata) {
            return res.json({
                success: false,
                message: "File not found"
            })
        }
        res.json({
            success: true,
            message: "File Found Succesfully!",
            data: filedata
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message,
        })
    }
}

// delete files by id

const deletefile = async (req, res) => {
    try {
        const file = await Fileuploader.findById(req.params.id)
        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }


        //  Physical file path
        const filePath = path.join(__dirname, "..", file.URL);

        //  Delete file from uploads folder
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        //  Delete from DB
        await Fileuploader.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "File deleted successfully"
        });

    }

    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred during deletion" });
    }
}

module.exports = {
    createfile, getAllFiles, getfilebyid, deletefile
}