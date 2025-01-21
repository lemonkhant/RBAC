const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();
const authorizeRoles = require("../middlewares/roleMiddleware");

// Only Can admin access this router
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "welcome to the admin" })
});

// Both admin and manager can access this router
router.get("/manager", verifyToken, authorizeRoles("admin", "manager"), (req, res) => {
    res.json({ message: "welcome to the Manager" })
});
// All can access this router
router.get("/user", verifyToken, authorizeRoles("admin", "manager", "user"), (req, res) => {
    res.json({ message: "welcome to the user" })
});

// Export the  router to make them available in other files
module.exports = router;