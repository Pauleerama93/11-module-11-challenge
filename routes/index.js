// Import the Router function from express
const router = require("express").Router();

// Import API and HTML routes
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes")

// Use the API routes for any paths starting with "/api"
router.use("/api", apiRoutes);

// Use the HTML routes for the root path "/"
router.use("/", htmlRoutes)

// Export the configured router
module.exports = router;