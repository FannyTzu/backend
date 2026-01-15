import { pool } from "../database/db.js";
import { pages } from "../data/pages.js";
import { weaponsPower } from "../data/weapons.js";

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

  try {
    const { name } = req.body;
    const userId = req.userId;

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

    res.json({ message: "Player supprimé avec succès", player: result.rows[0] });
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

    const playerResult = await pool.query(
      "SELECT * FROM players WHERE id = $1 AND user_id = $2",
      [playerId, userId]
    );

    if (playerResult.rows.length === 0) {
      return res.status(404).json({ message: "Player non trouvé" });
    }

    const player = playerResult.rows[0];

    const page = pages.find(p => p.id === nextPageId);
    if (!page) {
      return res.status(404).json({ message: "Page non trouvée" });
    }

    if (page.combat) {
      const combatState = {
        pageId: page.id,
        enemyType: page.combat.enemies.type,
        remainingEnemies: page.combat.enemies.count,
        enemyPower: page.combat.enemies.power,
        diceFaces: page.combat.dice.faces
      };

      const updatedPlayer = await pool.query(
        "UPDATE players SET combat_state = $1 WHERE id = $2 RETURNING *",
        [combatState, playerId]
      );

      return res.json({
        status: "COMBAT_STARTED",
        combat: combatState,
        player: updatedPlayer.rows[0],
        page
      });
    }

    let status = "OK";
    let deathReason = null;
    let deathTextId = null;

    if (page.autoEffect?.type === "DEATH" && !page.description) {

      status = "DEAD";
      deathReason = page.autoEffect.reason;
      deathTextId = page.autoEffect.deathTextId;
    }

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

    // update BDD
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
      status,
      deathReason,
      deathTextId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur application du choix" });
  }
};

//1 user 1 player
export const getMyPlayer = async (req, res) => {
  const userId = req.userId;

  const result = await pool.query(
    "SELECT * FROM players WHERE user_id = $1 LIMIT 1",
    [userId]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Aucun player trouvé" });
  }

  res.json(result.rows[0]);
};

// Reset player to initial state
export const resetPlayer = async (req, res) => {
  try {
    const playerId = Number(req.params.id);
    const userId = req.userId;

    const result = await pool.query(
      `UPDATE players 
      SET endurance = $1,
          money = $2,
          weapons = $3,
          stuff = $4,
          current_page_id = $5
      WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [20, 0, [], [], 1, playerId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Player non trouvé" });
    }

    res.json({
      message: "Partie remise à zéro avec succès",
      player: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur reset player" });
  }
};

export const rollCombatDice = async (req, res) => {
  const playerId = Number(req.params.id);
  const userId = req.userId;
  // 1️⃣ Récupérer le joueur et le combat en cours (inclut les armes)
  const result = await pool.query(
    "SELECT endurance, combat_state, weapons FROM players WHERE id = $1 AND user_id = $2",
    [playerId, userId]
  );

  const player = result.rows[0];
  if (!player || !player.combat_state) {
    return res.status(400).json({ message: "Pas de combat en cours" });
  }

  let { remainingEnemies, enemyPower, diceFaces, pageId } = player.combat_state;

  // helper: retourne la puissance de l'arme la plus puissante possédée (0 si aucune)
  const getBestWeaponPower = (playerWeapons) => {
    if (!playerWeapons || playerWeapons.length === 0) return 0;
    const owned = new Set(playerWeapons);
    let best = 0;
    for (const w of weaponsPower) {
      if (owned.has(w.name) && typeof w.power === 'number') {
        if (w.power > best) best = w.power;
      }
    }
    return best;
  };

  // 2️⃣ Lancer de dé
  const roll = Math.floor(Math.random() * diceFaces) + 1;

  // 3️⃣ Bonus d'arme : uniquement l'arme la plus puissante
  const weaponBonus = getBestWeaponPower(player.weapons);

  // 4️⃣ Dégâts : nombre d’ennemis tués (limité au nombre d'ennemis restants)
  const kills = Math.min(roll + weaponBonus, remainingEnemies);
  remainingEnemies -= kills;

  // 5️⃣ Contre-attaque : dégâts subis
  const enduranceLoss = remainingEnemies * enemyPower;
  const newEndurance = player.endurance - enduranceLoss;

  const page = pages.find(p => p.id === pageId);

  // 6️⃣ Défaite
  if (newEndurance <= 0) {
    await pool.query(
      "UPDATE players SET endurance = 0, combat_state = NULL, status = 'DEAD' WHERE id = $1",
      [playerId]
    );

    return res.json({
      status: "DEAD",
      deathTextId: page?.onLose?.deathTextId ?? null,
      roll,
      kills
    });
  }

  // 7️⃣ Victoire
  if (remainingEnemies <= 0) {
    await pool.query(
      "UPDATE players SET combat_state = NULL, endurance = $1, current_page_id = $2 WHERE id = $3",
      [newEndurance, page?.onWin ?? null, playerId]
    );

    return res.json({
      status: "COMBAT_WON",
      roll,
      kills,
      nextPageId: page?.onWin ?? null
    });
  }

  // 8️⃣ Combat continue
  const newCombatState = {
    ...player.combat_state,
    remainingEnemies
  };

  await pool.query(
    "UPDATE players SET combat_state = $1, endurance = $2 WHERE id = $3",
    [newCombatState, newEndurance, playerId]
  );

  return res.json({
    status: "COMBAT_CONTINUE",
    roll,
    kills,
    remainingEnemies,
    endurance: newEndurance
  });
};
