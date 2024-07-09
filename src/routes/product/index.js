import express from "express";

const router = express.Router();

import { uploadForm, saveData } from "../../controllers/ProductController";


router.get("/", uploadForm);
router.post("/save", saveData);

export default router;