const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requiredLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.get("/allpost", requiredLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => console.log(err));
});

router.get("/mypost", requiredLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => console.log(err));
});
router.post("/createpost", requiredLogin, (req, res) => {
    const { title, body, url } = req.body;

    if (!title || !body || !url) {
        res.status(422).json({ error: "Please fill all the required fields." });
    }

    req.user.password = undefined; //TODO

    const post = new Post({
        title,
        body,
        photo: url,
        postedBy: req.user,
    });

    post.save()
        .then((response) => {
            console.log(res);
            res.json({ post: response });
        })
        .catch((err) => console.log(err));
});

module.exports = router;
