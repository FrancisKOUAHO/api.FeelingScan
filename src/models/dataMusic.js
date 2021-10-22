import mongoose from "mongoose";
import {Binary, Long} from "mongodb";

const Schema = mongoose.Schema;

const musicSchema = new Schema({
    fieldname: {
        type: String

    },
    originalname: {
        type: String
    },
    encoding: {
        type: String
    },
    mimetype: {
        type: String
    },
    /*buffer: {
        type: Uint8Array
    },*/
    path: {
        type: String
    },
    size: {
        type: String
    },
    type:{
        default: "Joie"
    }
}, {timestamps: true});
const Music = mongoose.model('Music', musicSchema);

export {
    Music
}


