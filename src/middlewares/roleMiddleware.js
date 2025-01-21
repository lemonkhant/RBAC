
// Function to restrict access based on user roles
const authorizeRoles = (...allowedRoles) => {
    
     // Return a middleware function
    return (req,res,next) => {
        // Check if the user's role is included in the list of allowed roles
        if(!allowedRoles.includes(req.user.role)){
            // If not, respond with 403 Forbidden and a message
            return res.status(403).json({message: "Access Denied"});
        }
        // If the user's role is allowed, proceed to the next middleware or route
        next();
    }
}
// Export the middleware function for use in other files
module.exports = authorizeRoles;