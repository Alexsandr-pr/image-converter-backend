const Router = require("express");
const fileController = require("../controllers/fileController");
const router = new Router();



router.post("/image", fileController.addFile)
router.post("/get/:id", fileController.downloadFile)


module.exports = router
