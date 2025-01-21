const jwt = require("jsonwebtoken");

// Middleware to verify the token in incoming requests
const verifyToken = (req, res, next) => {
    let token; // Middleware to verify the token in incoming requests

    // Check if Authorization header exists (it can be in lowercase or uppercase)
    let authHeader = req.headers['authorization'] || req.headers['Authorization'];  // Ensure you check both cases
    
    // If the header exists and starts with 'Bearer'
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; // Extract the token from the 'Authorization' header (after 'Bearer')


        // If no token is found, send a 401 Unauthorized error
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        try {
            // Verify the token using the secret stored in environment variables
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the decoded user data to the 'req' object for future use in routes or middleware
            req.user = decoded; 

            // Log the decoded user for debugging purposes
            console.log("The decoded user is:", req.user);

            // Call the next middleware or route handler in the chain
            next(); 
        } catch (err) {
        
            return res.status(400).json({ message: "Token is not valid" });
        }
    } else {
            // If the Authorization header is missing or malformed, send a 401 Unauthorized error
        return res.status(401).json({ message: "Authorization header missing or malformed" });
    }
};




// Export the middleware so it can be used in other parts of the application
module.exports = verifyToken;