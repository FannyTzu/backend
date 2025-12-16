import { players } from "../data/players.js";

export const getAllPlayers
  = (req, res) => {
    res.json(players);
  };

export const getPlayerById = (req, res) => {
  const id = parseInt(req.params.id);
  const player = players.find((p) => p.id === id);
  if (!player) return res.status(404).json({ error: "Player non trouvé" });
  res.json(player);
};

export const createPlayer = (req, res) => {
  const newPlayer = {
    id: Date.now(),
    ...req.validatedBody,
  };
  players.push(newPlayer);
  res.status(201).json(newPlayer);
};

export const updatePlayer = (req, res) => {
  const id = parseInt(req.params.id);
  const index = players.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Player non trouvé" });

  players[index] = { ...players[index], ...req.body };
  res.json(players[index]);
};

export const deletePlayer = (req, res) => {
  const id = parseInt(req.params.id);
  const index = players.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Player non trouvé" });

  const deleted = players.splice(index, 1);
  res.json(deleted[0]);
};