import { players } from "../data/players.js";
import { pages } from "../data/pages.js";

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

export const createPlayer = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;

  const result = await pool.query(
    "INSERT INTO players (name, endurance, money, weapons, stuff, currentPageId, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [name, 40, 0, '{}', '{}', 1, userId]
  );

  res.status(201).json(result.rows[0]);
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

//endpoint to apply a choice and update player state

export const applyChoice = (req, res) => {
  const playerId = Number(req.params.id);
  const { nextPageId } = req.body;

  const player = players.find(p => p.id === playerId);
  const page = pages.find(p => p.id === nextPageId);

  if (!player || !page) {
    return res.status(404).json({ message: "Player or page not found" });
  }

  // impacts
  page.impact?.forEach(effect => {
    if (effect.endurance) player.endurance += effect.endurance;
    if (effect.money) player.money += effect.money;
  });

  // items
  page.items?.forEach(item => {
    if (item.weapons) player.weapons.push(item.weapons);
    if (item.money) player.money += item.money;
    if (item.stuff) player.stuff.push(...item.stuff);
  });

  player.currentPageId = nextPageId;

  res.json({ player, page });
};