
const sharp = require('sharp');
const path = require("path")
const archiver = require('archiver');
const fs = require('fs');


class FileService {

    async moveFile(file, destinationPath) {
        try {
            // Используем асинхронный метод sharp для преобразования и перемещения файла
            await sharp(file.data)
                .toFormat("webp", { quality: 100 })
                .toFile(destinationPath);
        } catch (error) {
            console.log(error);
        }
    }

    async addFileToDB(filePath, file) {
        try {
            await this.moveFile(file, filePath);

        } catch (error) {
            console.log(error);
        }
    }
    
    async convertToZip(files, req, nameZip) {

        const filesArray = [...files];
        const arrayImagesPath = filesArray.map(file => path.join(req.pathStatic, file));

        const outputPath = path.join(req.pathPublic, nameZip + ".zip");
        const output = fs.createWriteStream(outputPath);
        const archive = archiver('zip', {
            zlib: { level: 9 } 
        });

        output.on('close', () => {
            arrayImagesPath.forEach(filePath => {
                fs.unlinkSync(filePath);
            });
            const staticFiles = fs.readdirSync(req.pathStatic);
            staticFiles.forEach(file => {
                const filePath = path.join(req.pathStatic, file);
                fs.unlinkSync(filePath);
            });
        });

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(output);

        archive.directory(req.pathStatic, false);
        
        await archive.finalize();

    }

}

module.exports = new FileService();