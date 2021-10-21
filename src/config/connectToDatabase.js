import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL;

async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(MONGODB_URL, connectionParams);
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        console.log("could not connect to database");
    }
}

export {
    connection
}
