const express = require("express");
const router = express.Router();
const { createfile, getAllFiles, getfilebyid, deletefile, dashboard } = require("../controllers/files.controller");
const upload = require("../middleware/upload.middleware")


router.post("/upload", upload.single("image"), createfile);
router.get("/all", getAllFiles);

router.delete("/:id", deletefile)

// static route
router.get("/data", dashboard);

// dynamic route (by ID)
router.get("/:id", getfilebyid);
module.exports = router;


