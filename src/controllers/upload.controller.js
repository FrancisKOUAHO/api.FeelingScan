import {Picture} from "../models/dataPicture";

const savePicture = (req, res, next) => {
    const file = req.file
    console.log(req.file);

    let saveFile = new Picture({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
    })
    saveFile.save()

    if (!file) {
        const error = new Error('Veuillez télécharger un fichier')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}


const getPicture = (req, res, next) => {
    Picture.find((error, picture) => {
        if (error) {
            return res.status(500).json(
                {
                    success: false,
                }
            );
        } else {
            return res.status(201).json(
                {
                    data: picture,
                    success: true,
                }
            );
        }
    })
}


export {
    savePicture,
    getPicture
}
