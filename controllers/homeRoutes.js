const router = require('express').Router();

// display info from database
router.get("/", (req, res) => {
    res.send("test success")
    res.render("members")
});

// each page will have a route



module.exports = router;

