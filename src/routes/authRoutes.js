const express = require("express");
const {register,login} = require("../controllers/authController");

//This is using the express Router for the app routing system
const router = express.Router();

//This is the resgister Route 
router.post("/register",register);

//This is the Login route
router.post("/login",login);

// Export the router object to make it accessible in other parts of the application
module.exports = router;