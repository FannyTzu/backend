import { pages } from "../data/pages.js";

export const getAllPages = (req, res) => {
    res.json(pages);
};

export const getPageById = (req, res) => {
    const id = parseInt(req.params.id);
    const page = pages.find((p) => p.id === id);
    if (!page) return res.status(404).json({ error: "Page non trouvée" });
    res.json(page);
};

export const createPage = (req, res) => {
    const newPage = {
        id: Date.now(),
        ...req.validatedBody,
    };
    pages.push(newPage);
    res.status(201).json(newPage);
};

export const updatePage = (req, res) => {
    const id = parseInt(req.params.id);
    const index = pages.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Page non trouvée" });

    pages[index] = { ...pages[index], ...req.body };
    res.json(pages[index]);
};

export const deletePage = (req, res) => {
    const id = parseInt(req.params.id);
    const index = pages.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Page non trouvée" });

    const deleted = pages.splice(index, 1);
    res.json(deleted[0]);
};