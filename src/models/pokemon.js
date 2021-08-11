const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema(
  {
    "#": {
      type: Number,
    },
    Name: {
      type: String,
    },
    "Type 1": {
      type: String,
    },
    "Type 2": {
      type: String,
    },
    HP: {
      type: Number,
    },
    Attack: {
      type: Number,
    },
    Defense: {
      type: Number,
    },
    "Sp. Atk": {
      type: Number,
    },
    "Sp. Def": {
      type: Number,
    },
    Speed: {
      type: Number,
    },
    Generation: {
      type: Number,
    },
    Legendary: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const PokemonModel = mongoose.model("pokemon", PokemonSchema);

module.exports = PokemonModel;
