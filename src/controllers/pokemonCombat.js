const CombatModel = require("../models/combat");

const createMany = async (req, res) => {
  try {
    const { battles } = req.body;
    if (!battles) {
      res.status(400).send({ error: "Não foi encontrado nenhuma batalha" });
    }
    const data = await CombatModel.insertMany(battles);
    return res.send(data);
  } catch (error) {
    console.log("createCombats =>", error);
    res.status(500).send({ error: "Erro ao criar combates!" });
  }
};

const mostWins = async (req, res) => {
  try {
    const data = await CombatModel.aggregate([
      { $sort: { Winner: 1 } },
      {
        $lookup: {
          from: "pokemons",
          localField: "Winner",
          foreignField: "#",
          as: "pokemon",
        },
      },
      {
        $unwind: "$pokemon",
      },
      {
        $project: {
          nome: "$pokemon.Name",
          tipo: "$pokemon.Type 1",
          hp: "$pokemon.HP",
          ataque: "$pokemon.Attack",
          vitorias: "$Winner",
        },
      },
      { $limit: 150 },
    ]);
    return res.send(data);
  } catch (error) {
    console.log("battle mostWins =>", error);
  }
  return res.status.send({
    error: "Não pudemos listar os pokemons mais vitoriósos",
  });
};

const mostWinner = async (req, res) => {
  try {
    const data = await CombatModel.aggregate([
      {
        $group: {
          _id: "$Winner",
          vitorias: { $sum: 1 },
        },
      },
      {
        $sort: { vitorias: 1 },
      },
      {
        $limit: 150,
      },
      {
        $lookup: {
          from: "pokemons",
          localField: "_id",
          foreignField: "#",
          as: "pokemon",
        },
      },
      {
        $unwind: "$pokemon",
      },
      {
        $project: {
          _id: 0,
          nome: "$pokemon.Name",
          quantidade_vitorias: "$vitorias",
        },
      },
    ]);
    return res.send(data);
  } catch (error) {
    console.log("battle mostWins =>", error);
  }
  return res.status.send({
    error: "Não pudemos listar os pokemons mais vitoriósos",
  });
};

const typeHPExpecifyied = async (req, res) => {
  try {
    const data = await CombatModel.aggregate([
      { $limit: 3000 },
      {
        $lookup: {
          from: "pokemons",
          localField: "First_pokemon",
          foreignField: "#",
          as: "First_pokemon",
        },
      },
      {
        $lookup: {
          from: "pokemons",
          localField: "Second_pokemon",
          foreignField: "#",
          as: "Second_pokemon",
        },
      },

      {
        $match: {
          $or: [
            {
              "First_pokemon.Type 1": "Bug",
              "First_pokemon.HP": { $gte: 70 },
            },
            {
              "Second_pokemon.Type 1": "Fire",
              "Second_pokemon.HP": { $gte: 40 },
            },
          ],
        },
      },
      {
        $project: {
          items: { $concatArrays: ["$First_pokemon", "$Second_pokemon"] },
        },
      },
      { $unwind: "$items" },
      {
        $project: {
          nome: "$items.Name",
          id: "$items._id",
        },
      },
      {
        $group: {
          _id: "$nome",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          nome: "$_id",
          participacoes: "$count",
        },
      },
      { $sort: { participacoes: -1 } },
      { $limit: 1 },
    ]);
    return res.send(data);
  } catch (error) {
    console.log("battle mostWins =>", error);
  }
  return res.status.send({
    error: "Não pudemos listar os pokemons mais vitoriósos",
  });
};

module.exports = { createMany, mostWins, mostWinner, typeHPExpecifyied };
