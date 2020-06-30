const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requiredLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.get("/allpost", requiredLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
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

router.put("/like", requiredLogin, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $push: { likes: req.user._id },
        },
        {
            new: true,
        }
    ).exec((err, result) => {
        if (err) res.status(422).json({ error: err });
        else res.json(result);
    });
});

router.put("/unlike", requiredLogin, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $pull: { likes: req.user._id },
        },
        {
            new: true,
        }
    ).exec((err, result) => {
        if (err) res.status(422).json({ error: err });
        else res.json(result);
    });
});

router.put("/comment", requiredLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id,
    };
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $push: { comments: comment },
        },
        {
            new: true,
        }
    )
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .exec((err, result) => {
            if (err) res.status(422).json({ error: err });
            else res.json(result);
        });
});

// router.delete("/deletepost/:postId", requiredLogin, (req, res) => {
//     // Post.findOne({ _id: req.body.postId })
//     //     .populate("postedBy", "_id name")
//     //     .exec((err, post) => {
//     //         if (err || !post) res.status(422).json({ error: err });
//     //         if (post.postedBy._id.toString() == req.user._id.toString()) post.remove();
//     //     })
//     //     .then((result) => res.json(result))
//     //     .catch((err) => console.log(err));
// });

module.exports = router;
