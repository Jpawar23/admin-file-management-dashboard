const userdata = require("../models/files.model");
const path = require("path");
const fs = require("fs");
const createfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        // Save file info in DB
        const upload = await userdata.create({
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const total = await userdata.countDocuments();

        const files = await userdata.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        res.json({
            success: true,
            message: "data find succesfully!",
            data: files,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
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
        const filedata = await userdata.findById(req.params.id);
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
        const file = await userdata.findById(req.params.id)
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
        await userdata.findByIdAndDelete(req.params.id);

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



const dashboard = async (req, res) => {
    try {
        // Total users/files
        const totalFiles = await userdata.countDocuments(); // returns a number

        // Total storage used (if you have fileSize field)
        const totalStorageAgg = await userdata.aggregate([
            {
                $group: {
                    _id: null,
                    totalSize: { $sum: { $toLong: "$filesize" } }
                }
            }
        ]);

        const totalStorage = totalStorageAgg[0]?.totalSize || 0;


        // Recent uploads (last 5)
        const recentUploads = await userdata.find().sort({ createdAt: -1 }).limit(5);

        // File types count
        // const fileTypesAgg = await userdata.aggregate([
        //     { $group: { _id: "$mimetype", count: { $sum: 1 } } },
        //     { $project: { _id: 0, type: "$_id", count: 1 } }
        // ]);
        const fileTypesAgg = await userdata.aggregate([
            { $group: { _id: "$mimetype", count: { $sum: 1 } } },
            { $project: { _id: 0, type: "$_id", count: 1 } }
        ]);


        res.json({
            success: true,
            data: {
                totalFiles,
                totalStorage,
                recentUploads,
                fileTypes: fileTypesAgg
            },
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        });
    }
}
module.exports = {
    createfile, getAllFiles, getfilebyid, deletefile, dashboard
}