require("dotenv").config()
const express = require("express");


const PORT = process.env.PORT || 5000;

const app = express();
const router = require("./routes/index");


const corsMiddleware = require("./middleware/cors.middleware");

const fileUpload = require("express-fileupload");
const fileMiddleware = require("./middleware/filePath.middleware");
const publicMiddleware = require("./middleware/public.middleware")

const path = require("path")
app.use(corsMiddleware)
app.use(fileUpload({}))
app.use(express.json())
app.use(express.static("static"))


app.use(fileMiddleware(path.resolve(__dirname, "static")));
app.use(publicMiddleware(path.resolve(__dirname, "public")));

app.use("/api", router)



const start = async () => {

    try{
        

        app.listen(PORT, () => {
            console.log("Server has been started on port:", PORT)
        })
        
    } catch(e) {
        
    }
}

start()