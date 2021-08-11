const express = require("express");
const {
  list,
  listSpeedBelow60,
  listTypeLegendaryFie,
} = require("./controllers/pokemon");
const router = express.Router();

//will router the controllers.

router.get("/list", list);
router.get("/listSpeedBelow60", listSpeedBelow60);
router.get("/listTypeLegendaryFie", listTypeLegendaryFie);

//cache test
module.exports = router;
