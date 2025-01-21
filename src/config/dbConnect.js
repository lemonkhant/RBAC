const mongoose = require("mongoose");


// this code is Connect to the Database if some error have catch and show the console 
const dbConnect = async () => {


    try {
        //connect to the database
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database coneected : ${connect.connection.host}, ${connect.connection.name}`);
    } catch (err) {

        console.log(err);

        //is used to stop the Node.js process with a failure code (1), indicating there was an error.
        process.exit(1);
    }
};


module.exports = dbConnect;