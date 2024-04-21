const File = require("../models/File")
const sharp = require('sharp');
const path = require("path");

class FileService {

    async moveFile(file, destinationPath) {
        try {
            // Используем асинхронный метод sharp для преобразования и перемещения файла
            await sharp(file.data)
                .toFormat("webp", { quality: 40 })
                .toFile(destinationPath);
        } catch (error) {
            console.log(error);
        }
    }

    async addFileToDB(filePath, file, cardImageSource) {
        try {
            

            await this.moveFile(file, filePath);

            const fileModel = await File.create({ path: cardImageSource });
            await fileModel.save();
        } catch (error) {
            console.log(error);
        }
    }
    

    async getFiles(arr) {
        try {

        }catch{
            console.log(error);
        }
    }

}

module.exports = new FileService();