const router = require('express').Router();
const { Notes } = require('../../models')


// route that gets the notes for a user (Get route), route that gets a single note for a user (Get Route), route that saves a note for a user (post route), a route that deletes a note for a user (delete Route)

// /api/
router.post('/', async (req, res) => {
    try {
        if (req.user) {
            const newNotes = await Notes.create({
                ...req.body,
                user_id: req.user.id,
            });

            res.status(200).json(newNotes)
        } else {
            res.status(400).json({message: "You should be logged in :)"});
        }
    } catch (err) {
        res.status(400).json(err);
    }
});


// these are being handled by handlebars
// Get notes route all notes
// router.get("/allNotes", async (req, res) => {

// });

// Get notes route Individual Note
// router.get("/singleNote", async (req, res) => {

// });

// save route
router.post("/save", async (req, res) => {
    try {
        let newNote = await Notes(req.body)
        res.json(newNote)
    }
    catch (err) {
        res.json(err)
    }
});

// Delete route 
router.delete("/delete", async (req, res) => {

});

module.exports = router;
