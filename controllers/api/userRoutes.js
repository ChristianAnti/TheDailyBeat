const router = require("express").Router();
const { User } = require("../../models");
var passport = require("../../config/passport");
// /api/user
router.get("/", (req, res) => {
    res.send("User Route works!!!!!!!!!!");
});
// /api/user/login
router.post("/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
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
