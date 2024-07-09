import express from "express";

const router = express.Router();

import { importProduct, processData, newProductCreate, newProductDataSave, productSuccessList, productFailedList, productDuplicatedList } from "../../controllers/ProductController";


router.get("/import", importProduct);
router.post("/processing", processData);
router.get("/add", newProductCreate);
router.post("/create", newProductDataSave);
router.get("/success-list", productSuccessList);
router.get("/failed-list", productFailedList);
router.get("/duplicated-list", productDuplicatedList);

export default router;