// call all the required packages
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"

import {Picture} from "./src/models/dataPicture"
import {connection} from "./src/config/connectToDatabase"
import {upload} from "./src/middleware/upload";
import {getPicture, savePicture} from "./src/controllers/upload.controller";
import {saveMusic, getMusic} from "./src/controllers/uploadMusic.controller";
import multer from "multer";
import path from 'path';
import fs from "fs"

const __dirname = path.resolve();
const uploadFileMuisc = multer()


dotenv.config()
const PORT = parseInt(process.env.PORT || "8080");


//CREATE EXPRESS APP
const app = express();

// cors allow usage of server from different origin only for development
app.use(cors())
app.use(morgan('dev'))


//ROUTES WILL GO HERE
app.get('/', function (req, res) {
    res.json({message: 'Le serveur a démarré !'});
});


app.post('/uploadFilePicture', upload.single(), savePicture)
app.get('/getPicture', getPicture)


app.post('/uploadFileMuisc', uploadFileMuisc.single('soundBlob'), saveMusic);
app.get('/getMusic', getMusic)


connection()

app.listen(PORT, () => console.log(`Le serveur a démarré sur le port ${PORT}`));
