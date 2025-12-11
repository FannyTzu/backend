// routes/pages.routes.js
const express = require("express");
const router = express.Router();
const { pages } = require("../data/pages");

// GET toutes les pages
router.get("/", (req, res) => {
  res.json(pages);
});

// GET une page par id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const page = pages.find(p => p.id === id);
  if (!page) return res.status(404).json({ error: "Page non trouvée" });
  res.json(page);
});

// POST créer une nouvelle page
router.post("/", (req, res) => {
  const newPage = {
    id: Date.now(),
    title: req.body.title,
    text: req.body.text,
    choices: req.body.choices || []
  };
  pages.push(newPage);
  res.status(201).json(newPage);
});

// PUT modifier une page
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pages.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Page non trouvée" });

  pages[index] = { ...pages[index], ...req.body };
  res.json(pages[index]);
});

// DELETE supprimer une page
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pages.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Page non trouvée" });

  const deleted = pages.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
