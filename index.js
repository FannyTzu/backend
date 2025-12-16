import express from "express";
import cors from "cors";
import pagesRoutes from "./routes/pages.routes.js";
import playersRoutes from "./routes/players.routes.js";

const app = express();
const PORT = 3001;

// Middleware pour parser le JSON
app.use(express.json());

// Middleware CORS pour autoriser le front
app.use(cors());

// Routes
app.use("/pages", pagesRoutes);
app.use("/players", playersRoutes);

// Route racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Les Chroniques Imprévisibles !");
});

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
