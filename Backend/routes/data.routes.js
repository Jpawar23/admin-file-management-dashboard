const express = require("express");
const router = express.Router();
const { createfile, getAllFiles, getfilebyid, deletefile } = require("../controllers/data.controller");
const upload = require("../middleware/upload.middleware")
// router.post("/", upload.single("image"), createfile);
// router.get("/", getAllFiles)
// router.get("/:id", getfilebyid)

router.post("/upload", upload.single("image"), createfile);
router.get("/all", getAllFiles);
router.get("/:id", getfilebyid);
router.delete("/:id", deletefile)

module.exports = router;


