const mongoose = require("mongoose");


// Define a new schema for the 'user' model
const userSchema = new mongoose.Schema({

     // The 'username' field will store the user's name (string)
    username : {
        type: String,   // The data type of this field is String
        required: true, // This field is mandatory (cannot be left blank)
        unique: true,   // This field must be unique, i.e., no two users can have the same username

    },

    // The 'password' field will store the user's password (string)
    password: {
        type: String,    // The data type of this field is String
        required: true,  // This field is mandatory (cannot be left blank)
    },
    // The 'role' field will store the user's role (string)
    role:{
        type: String,      // The data type of this field is String
        required: true,     // This field is mandatory (cannot be left blank)
        enum: ["admin","manager","user"],  // This restricts the value of 'role' to one of the following: 'admin', 'manager', or 'user'
    },
    
},
{

    // This option adds two special fields: 'createdAt' and 'updatedAt' (automatically managed by Mongoose)
    timestamps:true, // Adds 'createdAt' and 'updatedAt' fields to the schema
}
);

module.exports = mongoose.model("User",userSchema);