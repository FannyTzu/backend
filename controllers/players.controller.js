import { pool } from "../database/db.js";
import { pages } from "../data/pages.js";

export const getAllPlayers = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      "SELECT * FROM players WHERE user_id = $1",
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const playerId = Number(req.params.id);
    const userId = req.userId;

    const result = await pool.query(
      "SELECT * FROM players WHERE id = $1 AND user_id = $2",
      [playerId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Player non trouvé" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


export const createPlayer = async (req, res) => {
  console.log("=== CRÉATION PLAYER ===");
  console.log("REQ USER ID:", req.userId);
  console.log("REQ BODY:", req.body);

  try {
    const { name } = req.body; // Utiliser body car le middleware valide mais ne crée pas validatedBody
    const userId = req.userId;

    console.log("Nom du player:", name);
    console.log("User ID:", userId);

    const result = await pool.query(
      `INSERT INTO players 
      (name, endurance, money, weapons, stuff, current_page_id, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [name, 40, 0, [], [], 1, userId]
    );

    console.log("Player créé:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erreur création player:", err);
    res.status(500).json({ message: "Erreur création player" });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const playerId = Number(req.params.id);
    const userId = req.userId;
    const { name } = req.body;

    const result = await pool.query(
      `UPDATE players
      SET name = $1
      WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [name, playerId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Player non trouvé" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur mise à jour player" });
  }
};


export const deletePlayer = async (req, res) => {
  try {
    const playerId = Number(req.params.id);
    const userId = req.userId;

    const result = await pool.query(
      "DELETE FROM players WHERE id = $1 AND user_id = $2 RETURNING *",
      [playerId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Player non trouvé" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur suppression player" });
  }
};

//endpoint to apply a choice and update player state

export const applyChoice = async (req, res) => {
  try {
    const playerId = Number(req.params.id);
    const { nextPageId } = req.body;
    const userId = req.userId;

    // 1️⃣ Récupérer le player
    const playerResult = await pool.query(
      "SELECT * FROM players WHERE id = $1 AND user_id = $2",
      [playerId, userId]
    );

    if (playerResult.rows.length === 0) {
      return res.status(404).json({ message: "Player non trouvé" });
    }

    const player = playerResult.rows[0];

    // 2️⃣ Récupérer la page
    const page = pages.find(p => p.id === nextPageId);
    if (!page) {
      return res.status(404).json({ message: "Page non trouvée" });
    }

    // 3️⃣ Calculer les nouveaux états
    let endurance = player.endurance;
    let money = player.money;
    let weapons = [...player.weapons];
    let stuff = [...player.stuff];

    page.impact?.forEach(effect => {
      if (effect.endurance) endurance += effect.endurance;
      if (effect.money) money += effect.money;
    });

    page.items?.forEach(item => {
      if (item.weapons) weapons.push(item.weapons);
      if (item.money) money += item.money;
      if (item.stuff) stuff.push(...item.stuff);
    });

    // 4️⃣ Mise à jour BDD
    const updated = await pool.query(
      `UPDATE players 
      SET endurance = $1,
          money = $2,
          weapons = $3,
          stuff = $4,
          current_page_id = $5
      WHERE id = $6
       RETURNING *`,
      [endurance, money, weapons, stuff, nextPageId, playerId]
    );

    res.json({
      player: updated.rows[0],
      page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur application du choix" });
  }
};
