import express from "express";
import {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getMyPlayer
} from "../controllers/players.controller.js";
import { playerSchema, createPlayerSchema, updatePlayerSchema } from "../schemas/player.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { applyChoice } from "../controllers/players.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route spécifique AVANT les routes paramétrées
router.get("/me", verifyToken, getMyPlayer);

// CRUD for players
router.get("/", verifyToken, getAllPlayers);
router.get("/:id", verifyToken, getPlayerById);
router.post("/", verifyToken, validateSchema(createPlayerSchema), createPlayer);
router.put("/:id", verifyToken, validateSchema(updatePlayerSchema), updatePlayer);
router.delete("/:id", verifyToken, deletePlayer);

//apply choice route
router.post("/:id/choice", verifyToken, applyChoice);
export default router;