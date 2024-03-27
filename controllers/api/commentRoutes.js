const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require("../../models");

router.get("/", (req, res) => {
    Comment.findAll({include:[User, Blog]})
      .then(dbComments => {
        res.json(dbComments);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id,{include:[User, Blog]})
      .then(dbComment => {
        res.json(dbComment);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

router.post("/", (req, res) => {
    if(!req.session.user){
      return res.status(401).json({msg:"Please login first!"})
  }
    Comment.create({
      body:req.body.body,
      userId:req.session.user.id,
      blogId:req.body.blogId
    })
      .then(newComment => {
        res.json(newComment);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

router.put("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Please login first!" });
    }

    Comment.findByPk(req.params.id)
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ msg: "Comment not found" });
            }

            // Check if the user is the author of the comment
            if (comment.userId !== req.session.user.id) {
                return res.status(401).json({ msg: "Unauthorized to update this comment" });
            }

            // Update the comment
            Comment.update(req.body, {
                where: {
                    id: req.params.id
                }
            }).then(updatedComment => {
                res.json(updatedComment);
            }).catch(err => {
                console.log(err);
                res.status(500).json({ msg: "An error occurred", err });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occurred", err });
        });
});

// In the DELETE route
router.delete("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Please login first!" });
    }

    Comment.findByPk(req.params.id)
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ msg: "Comment not found" });
            }

            // Check if the user is the author of the comment
            if (comment.userId !== req.session.user.id) {
                return res.status(401).json({ msg: "Unauthorized to delete this comment" });
            }

            // Delete the comment
            Comment.destroy({
                where: {
                    id: req.params.id
                }
            }).then(delComment => {
                res.json(delComment);
            }).catch(err => {
                console.log(err);
                res.status(500).json({ msg: "An error occurred", err });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occurred", err });
        });
    })
  
module.exports = router;