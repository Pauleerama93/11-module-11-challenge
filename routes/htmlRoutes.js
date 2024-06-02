const router = require("express").Router();
const path = require("path");


//HTML Routes
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})
//By default goes to homepage 
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports= router;