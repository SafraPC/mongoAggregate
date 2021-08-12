const mongoose = require("mongoose");

const CombatSchema = mongoose.Schema({
  First_pokemon: {
    type: Number,
  },
  Second_pokemon: {
    type: Number,
  },
  Winner: {
    type: Number,
  },
});
const CombatModel = mongoose.model("combats", CombatSchema);
module.exports = CombatModel;
