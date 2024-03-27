const express = require('express');
const router = express.Router();
const frontEnd = require("./frontendRoutes");
const userRoutes = require("./api/userRoutes.js");
const blogRoutes = require("./api/blogRoutes");
const commentRoutes = require("./api/commentRoutes");

router.use("/api/users",userRoutes)
router.use("/api/blogs",blogRoutes)
router.use("/api/comments",commentRoutes)
router.use("/",frontEnd)

router.get("/showsessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;