export const validateSchema = (schema) => (req, res, next) => {
  try {
    console.log("Body reçu:", req.body);
    schema.parse(req.body);
    next();
  } catch (err) {
    console.error("Erreur validation:", err.errors);
    return res.status(400).json({ message: "Données invalides", errors: err.errors });
  }
};
