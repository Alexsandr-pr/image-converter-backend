const {Schema, model} = require("mongoose")


const File = new Schema({
    path:{type:String, required:true},
})


module.exports = model("File", File);