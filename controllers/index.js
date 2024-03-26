const router = require("express").Router();
const frontEnd = require("./frontendRoutes");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use("/",frontEnd)

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

router.get("/showsessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;
