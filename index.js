// index.js
const express = require("express");
const cors = require("cors");
const pagesRoutes = require("./routes/pages.routes");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Utilisation des routes pages
app.use("/pages", pagesRoutes);

app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
