import express from "express";
import {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "../controllers/players.controller.js";
import { playerSchema } from "../schemas/player.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { applyChoice } from "../controllers/players.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// CRUD for players
router.get("/", getAllPlayers);
router.get("/:id", getPlayerById);
// router.get("/", verifyToken, getAllPlayers);
// router.get("/:id", verifyToken, getPlayerById);
router.post("/", validateSchema(playerSchema), createPlayer);
router.put("/:id", validateSchema(playerSchema), updatePlayer);
router.delete("/:id", deletePlayer);

//apply choice route
router.post("/:id/choice", applyChoice);
// router.post("/:id/choice", verifyToken, applyChoice);
export default router;