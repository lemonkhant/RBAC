const express = require ("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


//connect the db initial state
dbConnect();


//Create the express sever for the webapp
const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);

//Start the server
const PORT = process.env.PORT || 7002;


//Listing the Sever is running the which port
app.listen(PORT,() => {
    console.log(`Sever is running at port ${PORT}`)
});