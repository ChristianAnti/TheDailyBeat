const router = require('express').Router();
const { request } = require('express');
const { Notes } = require('../models')


// display info from database
router.get("/", async (req, res) => {
    const dbNotes = await Notes.findAll({
        where:{
            user_id: req.user.id
        }
    })
    let notes = [];
    if (dbNotes) {
        notes = dbNotes.map(note => note.get({plain: true}));
    }
    res.render("members", {layout: "membersMain", notes})
});


// each page will have a route



router.get("/signup", (req, res) => {
    res.render('signup')
});

router.get("/login", (req, res) => {
    res.render('login')
});



module.exports = router;

