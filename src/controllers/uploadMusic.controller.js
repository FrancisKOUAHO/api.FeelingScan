import multer from "multer";
import path from 'path';
import fs from "fs";

const __dirname = path.resolve();
import {Music} from "../models/dataMusic"

const saveMusic = (req, res, next) => {

    console.log(req.file);

    let uploadLocation = __dirname + '/uploads/music/' + req.file.originalname // where to save the file to. make sure the incoming name has a .wav extension
    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file

    let saveFile = new Music({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        // buffer: req.file.buffer,
        path: req.file.path,
        size: req.file.size,
    })

    saveFile.save()

    res.sendStatus(200); //send back that everything went ok
}


const getMusic = (req, res, next) => {
    Music.find((error, music) => {
        if (error) {
            return res.status(500).json(
                {
                    success: false,
                }
            );
        } else {
            return res.status(201).json(
                {
                    data: music,
                    success: true,
                }
            );
        }
    })
}


export {
    saveMusic,
    getMusic
}
