

const path = require("path")
const fs = require('fs');
const fileService = require("../services/fileService");



class fileController {
    async addFile(req, res) {

        // Разделить файлы по 1 картинке.
        const files = req.files.file;

        const arrayImages = []

        // Перебрать массив и вызвать функцию добавление в базу данных
        for (let i = 0; i < files.length; i++) {

            const file = files[i];
            const fileName = file.name.replace(/\.png$|\.jpg$|\.svg$/, "");
            const cardImageSource = fileName + ".webp";
            const filePath = path.join(req.pathStatic, cardImageSource);
            arrayImages.push(cardImageSource)
            await fileService.addFileToDB(filePath, file, cardImageSource);
        }
        return res.json({...arrayImages})
    }
}


module.exports = new fileController();



/*  try {
            const files = req.files.file;
            const convertedFiles = [];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const filename = `${file.name}.webp`;
                    const filePath = path.join(req.pathStatic, filename);
    
                    // Конвертация изображения в формат WebP и сохранение в файл
                    sharp(file.data)
                        .toFormat("webp", {quality:40})
                        .toFile(filePath, (err, info) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(info);
                                convertedFiles.push({
                                    name: file.name,
                                    path: filePath,
                                    size: info.size,
                                    mimetype: 'image/webp'
                                });
                            }
                        });
                }
        
            return res.send(convertedFiles);
            // Отправка массива информации о сохраненных файлах
        } catch (e) {
            console.log(e);
            res.status(500).send('Internal Server Error');
        }

        \*/
