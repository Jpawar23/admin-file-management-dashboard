const express = require("express");
const { createEmployee } = require("../controllers/employee.controller");
const router = express.Router();

router.post('/', createEmployee);
module.exports = router;