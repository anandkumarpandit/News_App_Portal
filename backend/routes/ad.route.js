import express from "express"
import { createAd, getAds, updateAd, deleteAd } from "../controllers/ad.controller.js"
const router = express.Router()

router.post("/create", createAd) // Upload Ad
router.get("/get", getAds) // Fetch All Ads
router.put("/update/:id", updateAd) // Update Ad
router.delete("/delete/:id", deleteAd) // Delete Ad

export default router