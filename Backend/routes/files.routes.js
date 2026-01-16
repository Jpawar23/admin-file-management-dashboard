const express = require("express");
const router = express.Router();
const { createfile, getAllFiles, getfilebyid, deletefile, dashboard } = require("../controllers/files.controller");
const upload = require("../middleware/upload.middleware")
// router.post("/", upload.single("image"), createfile);
// router.get("/", getAllFiles)
// router.get("/:id", getfilebyid)

router.post("/upload", upload.single("image"), createfile);
router.get("/all", getAllFiles);
// router.get("/:id", getfilebyid);
router.delete("/:id", deletefile)
// router.get("/data", dashboard);

// static route
router.get("/data", dashboard);

// dynamic route (by ID)
router.get("/:id", getfilebyid);
module.exports = router;


