const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requiredLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");
const Post = mongoose.model("Post");

router.get("/user/:id", requiredLogin, (req, res) => {
    User.findOne({ _id: req.params.id })
        .select("-password")
        .then((user) => {
            Post.find({ postedBy: req.params.id })
                .populate("postedBy", "_id name")
                .exec((err, posts) => {
                    if (err) res.status(404).json({ error: err });
                    else res.json({ user, posts });
                });
        })
        .catch((err) => res.status(404).json({ error: "User not found." }));
});

module.exports = router;
