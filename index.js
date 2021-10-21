// call all the required packages
import express from "express"
import multer from "multer"
import fileExtension from "file-extension"
import cors from "cors"
import dotenv from "dotenv"

import {Picture} from "./src/models/dataPicture"
import {connection} from "./src/config/connectToDatabase"


dotenv.config()
const PORT = parseInt(process.env.PORT || "8080");


//CREATE EXPRESS APP
const app = express();

// cors allow usage of server from different origin only for development
app.use(cors())


// Configure Storage
const storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
})


const upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success
        cb(undefined, true)
    }
})


//ROUTES WILL GO HERE
app.get('/', function (req, res) {
    res.json({message: 'Server Started!'});
});


app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file
    console.log(req);

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
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})


app.get('/getPicture', (req, res, next) => {
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
})


connection()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
