const express = require("express");
const router = express.Router();

//will router the controllers.

router.get("/", (req, res) => res.send({ message: "welcome!" }));

//cache test
module.exports = router;
