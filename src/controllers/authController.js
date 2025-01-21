const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


// Register Function
const register = async(req,res) => {

    try{

    // Destructure the username, password, and role from the request body
    const {username,password,role} = req.body;
    // Hash the password using bcrypt with a salt rounds value of 10
    const hashedPassword = await bcrypt.hash(password,10);
     // Create a new user instance with the provided details
    const newUser = new User({username,password: hashedPassword, role});
    
    // Save the new user to the database
    await newUser.save();
    // Respond with a success message and the status code 201 (Created)
    res.status(201).json({message: `User registered with username ${username } `});

}catch(err){
    // If an error occurs, respond with a generic error message and status 500 (Internal Server Error)
    res.status(500).json({message: `Something went wrong`});

}
}


// Login Function
const login = async(req,res) =>{

    try{
    // Destructure the username and password from the request body
    const {username,password} = req.body;
    // Find the user in the database using the provided username
    const user = await User.findOne({username});
    // If no user is found, respond with a 404 error and an appropriate message
    if(!user){
        return res.status(404).json({message: `User with username ${username} not found `});
    }
     // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password,user.password);

    // If passwords don't match, respond with a 400 error and an invalid credentials message
    if(!isMatch){
        return res.status(400).json({message: `Invalid credentail`});
    }
    // Create a JWT token containing the user's ID and role, which expires in 1 hour
    const token = jwt.sign(
        {
            id:user._id,
            role:user.role,

        },
        process.env.JWT_SECRET, // Secret key to sign the JWT (usually stored in environment variables)
        { expiresIn: "1h"} // Token expiration time is 1 hour
    );
    // Respond with the JWT token and a status code 200 (OK)
    res.status(200).json({ token });
}catch(err){

     // If an error occurs, respond with a generic error message and status 500 (Internal Server Error)
    res.status(500).json({message: `Something went wrong`});

}
}


// Export the register and login functions to make them available in other files
module.exports = {
    register,
    login,
}