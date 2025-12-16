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

const router = express.Router();

router.get("/", getAllPlayers);
router.get("/:id", getPlayerById);
router.post("/", validateSchema(playerSchema), createPlayer);
router.put("/:id", validateSchema(playerSchema), updatePlayer);
router.delete("/:id", deletePlayer);
export default router;