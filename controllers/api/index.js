const router = require("express").Router();
const userRoutes = require("./userRoutes");
const BlogRoutes = require("./blogRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/users", userRoutes);
router.use("/blogs", BlogRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
