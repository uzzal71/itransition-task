import express from "express";
import product from './product'
import dashboard from './dashboard'

const router = express.Router();

router.use("/", dashboard)
router.use("/products", product);

export default router;