

const path = require("path")
const fs = require('fs');
const fileService = require("../services/fileService");
const { isArray } = require("util");
const uuid = require("uuid")


class fileController {
    async addFile(req, res) {

        let files = req.files.file;

        const arrayImages = []
        const nameZip =  uuid.v4();

        if(isArray(files) ) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                const fileName = file.name.replace(/\.png$|\.jpg$|\.svg$/, "");
                const cardImageSource = fileName + ".webp";
                const filePath = path.join(req.pathStatic, cardImageSource);


                arrayImages.push(cardImageSource)
                
                await fileService.addFileToDB(filePath, file, cardImageSource);
            }
            
            await fileService.convertToZip([...arrayImages], req, nameZip) 
            return res.json({nameZip})
        }  
        
        const fileName = files.name.replace(/\.png$|\.jpg$|\.svg$/, "");    
        const cardImageSource = fileName + ".webp";
        const filePath = path.join(req.pathStatic, cardImageSource);

        arrayImages.push(cardImageSource)

        await fileService.addFileToDB(filePath, files, cardImageSource);


        await fileService.convertToZip([...arrayImages], req, nameZip)

        return res.json({nameZip})
    }

/*
    async  downloadFile(req, res) {
        try {

            const outputPath = path.join(req.pathPublic, `${req.params.id}.zip`);
            return res.download(outputPath, "archive")
            
        } catch (err) {
            console.error(err);
        }
    }
    */
    async downloadFile(req, res) {
        try {
            const outputPath = path.join(req.pathPublic, `${req.params.id}.zip`);
            res.download(outputPath, "archive", async (err) => {
                if (err) {
                    return;
                }
                await fs.promises.unlink(outputPath);
            });
        } catch (err) {
            console.error(err);
        }
    }
}


module.exports = new fileController();


