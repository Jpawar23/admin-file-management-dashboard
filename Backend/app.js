const express = require('express');
const path = require('path')
const cors = require("cors");
const app = express();
const filesRoutes = require("./routes/files.routes");
// Middleware for parsing JSON bodies (for API requests)
app.use(express.json());
app.use(cors());
app.use("/api/files", filesRoutes);
// app.use("/api/uploadfile", filesRoutes);
// app.use("/api/getallfiles", filesRoutes);
// app.use("/api/getfilebyid/:id", filesRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;



