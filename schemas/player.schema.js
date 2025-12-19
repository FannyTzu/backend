import { z } from "zod";

const playerBaseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(30),
  currentPageId: z.number().int().positive(),
  endurance: z.number().int()
});

const playerStatsSchema = playerBaseSchema.extend({
  money: z.number().int().optional(),
  weapons: z.array(z.string()).optional(),
  inventory: z.array(z.string()).optional()
});

const playerSchema = playerStatsSchema.extend({
  userId: z.number().int().positive()
});

// Schéma pour la création - seulement le nom est requis
const createPlayerSchema = z.object({
  name: z.string().min(1).max(30)
});

// const finalPlayerSchema = playerSchema.extend({
//   status: z.enum(["alive", "dead", "finished"])
// });

export { playerBaseSchema, playerStatsSchema, playerSchema, createPlayerSchema };