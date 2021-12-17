const router = require("express").Router();
const { User } = require("../../models");
var passport = require("../../config/passport");
// /api/user
router.get("/", (req, res) => {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            username: req.user.email,
        });
    }
});

// /api/user/login
router.post("/login", passport.authenticate("local"), function (req, res) {
    // res.redirect('/')
    res.json(req.user);
});

// /api/user/signup
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData)
        if (userData) {
            passport.authenticate("local")(req, res, function () {
                res.redirect('/members')
            })
        } else
            res.redirect(307, "/api/login");
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/logout", async (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;


// Insomnia cannot check login routes
// login for existing user // use passport version later
// userRoutes.post("/login", async (req, res) => {
//     try {
//         const userData = await User.findOne({ where: { username: req.body.username } });
//         if (!userData) {
//             res
//                 .status(400)
//                 .json({ message: "Incorrect information, please try again" });
//             return;
//         }

//         // uses instance method to check if password provided matches user password
//         const validPassword = await userData.checkPassword(req.body.password);
//         if (!validPassword) {
//             res
//                 .status(400)
//                 .json({ message: "Incorrect information, please try again" });
//             return;
//         }

//         // Once user logs in, set up the sessions variable 'loggedIn' and user's ID
//         req.session.save(() => {
//             req.session.loggedIn = true;
//             req.session.user_id = userData.id;

//             res.status(200).json({
//                 user: userData,
//                 message: "Logged in! 😊",
//             });
//         });
//     } catch {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });
