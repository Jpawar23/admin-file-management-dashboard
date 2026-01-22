// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//         cb(null, true);
//     }
//     else {
//         cb(new Error("only pdf files are allowed"), false)
//     }
// };
// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter,
// });

// module.exports = upload; // export multer instance
// // module.exports = { upload };



const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//         cb(null, true);
//     } else {
//         cb(new Error("Only PDF files are allowed"), false);
//     }
// };

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    // fileFilter,
});

module.exports = upload;







