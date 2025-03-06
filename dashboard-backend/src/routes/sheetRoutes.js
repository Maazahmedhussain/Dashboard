import express from "express";
import { getSheetData, addSheetRow } from "../controllers/sheetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/fetch", authMiddleware, getSheetData);
router.post("/add", authMiddleware, addSheetRow);

export default router;
