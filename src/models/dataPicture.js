const mongoose = require("mongoose") ;

const Schema = mongoose.Schema;

const pictureSchema = new Schema({
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
    destination: {
        type: String
    },
    filename: {
        type: String
    },
    path: {
        type: String
    },
    size: {
        type: String
    }
},{timestamps: true});
const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture


