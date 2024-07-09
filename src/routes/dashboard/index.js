import express from "express";

const router = express.Router();

import { dashboard} from "../../controllers/DashboardController";


router.get("/", dashboard);

export default router;