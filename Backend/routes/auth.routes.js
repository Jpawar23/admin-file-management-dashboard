const express = require("express");
const { loginEmployee } = require("../controllers/auth.controller")
const router = express.Router();
router.post("/", loginEmployee)
module.exports = router;