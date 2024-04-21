const Router = require("express");
const router = new Router();

const filesRouter = require("./filesRouter")

router.use("/images", filesRouter)


module.exports = router
