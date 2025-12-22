import { z } from "zod";

// Schéma pour le mot de passe robuste
const passwordSchema = z
  .string()
  .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
  .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une lettre majuscule" })
  .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une lettre minuscule" })
  .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
  .regex(/[^A-Za-z0-9]/, { message: "Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*()_+-=[]{}|;':\",./<>?)" });

// Schéma pour l'inscription
const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email est requis" })
    .email({ message: "L'email doit être valide" }),
  password: passwordSchema
});

// Schéma pour la connexion
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email est requis" })
    .email({ message: "L'email doit être valide" }),
  password: z
    .string()
    .min(1, { message: "Le mot de passe est requis" })
});

export { registerSchema, loginSchema, passwordSchema };