const mongoose = require("mongoose");

module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect("mongodb+srv://Francis:WAIRECRAFFTERLOUANNE2020@skyplus.e0y0i.mongodb.net/FeelingScan?retryWrites=true&w=majority", connectionParams);
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        console.log("could not connect to database");
    }
};
