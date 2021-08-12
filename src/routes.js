const express = require("express");
const {
  list,
  listSpeedBelow60,
  listTypeLegendaryFie,
} = require("./controllers/pokemon");
const {
  createMany,
  mostWins,
  mostWinner,
  typeHPExpecifyied,
} = require("./controllers/pokemonCombat");
const router = express.Router();

//will router the controllers.

router.get("/list", list);
router.get("/listSpeedBelow60", listSpeedBelow60);
router.get("/listTypeLegendaryFie", listTypeLegendaryFie);

//battles
router.post("/createBattles", createMany);
router.get("/mostWinners", mostWins);
router.get("/mostWinner", mostWinner);
router.get("/typeHPExpecifyied", typeHPExpecifyied);

//cache test
module.exports = router;
