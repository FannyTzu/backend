import express from "express";
import {
    getAllPages,
    getPageById,
    createPage,
    updatePage,
    deletePage,
} from "../controllers/pages.controller.js";
import { pageSchema } from "../schemas/page.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const router = express.Router();

router.get("/", getAllPages);
router.get("/:id", getPageById);
router.post("/", validateSchema(pageSchema), createPage);
router.put("/:id", validateSchema(pageSchema), updatePage);
router.delete("/:id", deletePage);

export default router;