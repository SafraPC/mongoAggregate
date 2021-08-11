const PokemonModel = require("../models/pokemon");

const list = async (req, res) => {
  try {
    //is greater than or equal
    //sort 1 for ascending or -1 for descending.
    let data = await PokemonModel.find({ Speed: { $lte: 60 } }, { _id: 0 })
      .select("Name HP Speed")
      .sort({ Speed: -1 })
      .lean();
    res.send({ data });
  } catch (error) {
    console.log("create pokemon =>", error);
    return res.status(400).send({ error: "Intern error" });
  }
};
const listSpeedBelow60 = async (req, res) => {
  try {
    //aggregate
    let data = await PokemonModel.aggregate([
      { $match: { Speed: { $lte: 60 } } },
      {
        $project: {
          velocidade: "$Speed",
          nome: "$Name",
          _id: 0,
        },
      },
    ]);
    res.send({ data });
  } catch (error) {
    console.log("create pokemon =>", error);
    return res.status(400).send({ error: "Intern error" });
  }
};
const listTypeLegendaryFie = async (req, res) => {
  try {
    //aggregate
    let data = await PokemonModel.aggregate([
      { $match: { "Type 1": "Fire", Legendary: "True" } },
      { $sort: { "Sp. Atk": -1 } },
      {
        $project: {
          Nome: "$Name",
          Velocidade: "$Speed",
          "Sp. Atk": 1,
          "Tipo 1": "$Type 1",
          Lendario: "$Legendary",
          _id: 0,
        },
      },
    ]);
    res.send({ data });
  } catch (error) {
    console.log("create pokemon =>", error);
    return res.status(400).send({ error: "Intern error" });
  }
};
module.exports = { list, listSpeedBelow60, listTypeLegendaryFie };
