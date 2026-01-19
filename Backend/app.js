
const dotenv = require("dotenv");
dotenv.config();  // 👈 MUST be first
const express = require('express');
const path = require('path')
const cors = require("cors");
const app = express();
const filesRoutes = require("./routes/files.routes");
const createEmployee = require('./routes/employee.routes');
const loginEmployee = require('./routes/auth.routes')
// Middleware for parsing JSON bodies (for API requests)
app.use(express.json());
app.use(cors());
app.use("/api/files", filesRoutes);
app.use("/api/user", createEmployee);
app.use("/api/login", loginEmployee);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;



