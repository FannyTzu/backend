export const validateSchema = (schema) => (req, res, next) => {
    try {
        req.validatedBody = schema.parse(req.body);
        next();
    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
};