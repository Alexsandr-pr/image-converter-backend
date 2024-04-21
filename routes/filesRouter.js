const Router = require("express");
const fileController = require("../controllers/fileController");
const router = new Router();



router.post("/image", fileController.addFile)


module.exports = router
