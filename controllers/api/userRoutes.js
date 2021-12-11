const userRoutes = require("express").Router();
const { User } = require("../../models");


// login for existing user
userRoutes.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            res
                .status(400)
                .json({ message: "Incorrect information, please try again" });
            return;
        }

        // uses instance method to check if password provided matches user password
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: "Incorrect information, please try again" });
            return;
        }

        // Once user logs in, set up the sessions variable 'loggedIn' and user's ID
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.id;

            res.status(200).json({
                user: userData,
                message: "Logged in! 😊",
            });
        });
    } catch {
        console.log(err);
        res.status(500).json(err);
    }
});

