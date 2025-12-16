import { z } from "zod";

const conditionSchema = z.object({
  type: z.enum(["item", "money", "dice"]),
  value: z.any()
});

const choiceSchema = z.object({
  label: z.string().min(1),
  nextId: z.number().int().positive(),
  available: z.boolean(),
  conditions: z.array(conditionSchema).optional()
});

export const impactSchema = z.object({
  endurance: z.number().optional(),
  money: z.number().optional()
});

export const itemSchema = z.object({
  weapons: z.string().optional(),
  power: z.number().optional(),
  money: z.number().optional(),
  stuff: z.array(z.string()).optional()
});

export const pageSchema = z.object({
  id: z.number().int().positive(),
  description: z.string().min(1),
  choices: z.array(choiceSchema),
  impact: z.array(impactSchema).optional(),
  items: z.array(itemSchema).optional()
});
