const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin")


router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name)
        return res.status(422).json({ err: "Please fill all required fields." });

    User.findOne({ email: email })
        .then(savedUser => {
            if (savedUser)
                return res.status(422).json({ err: "User with that email already exist." });
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        name,
                        password: hashedPassword
                    })

                    user.save()
                        .then(user => res.json({ message: "Account created successfully." }))
                        .catch(err => console.log(err));
                })
        })
        .catch(err => console.log(err));

});

router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(422).json({ err: "Please fill all required fields." });

    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser)
                return res.status(422).json({ err: "Invalid email or password." });

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
                        const {_id, name, email} = savedUser;
                        res.json({ token, user: {
                            _id,
                            email,
                            name
                        }});
                    } else
                        return res.status(422).json({ err: "Invalid email or password." });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

});
module.exports = router;