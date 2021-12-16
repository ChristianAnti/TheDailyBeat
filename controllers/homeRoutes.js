const router = require('express').Router();

// display info from database
router.get("/", (req, res) => {
    res.render("members")
});

// each page will have a route

router.get("/signup", (req, res) => {
    res.render('signup')
});

router.get("/login", (req, res) => {
    res.render('login')
});



module.exports = router;

