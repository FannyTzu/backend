import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pagesRoutes from "./routes/pages.routes.js";
import playersRoutes from "./routes/players.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = 3001;

// Middleware pour parser le JSON
app.use(express.json());

// Middleware CORS pour autoriser le front
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Routes
app.use("/pages", pagesRoutes);
app.use("/players", playersRoutes);
app.use("/auth", authRoutes);

// Route racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Les Chroniques Imprévisibles !");
});

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
