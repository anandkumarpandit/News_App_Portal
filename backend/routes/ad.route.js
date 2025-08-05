// import express from "express";
// import multer from "multer";
// import { createAd, getAds, updateAd, deleteAd } from "../controllers/ad.controller.js";

// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/create", upload.single("image"), createAd); // Upload Ad
// router.get("/get", getAds); // Fetch All Ads
// router.put("/update/:id", updateAd); // Update Ad
// router.delete("/delete/:id", deleteAd); // Delete Ad

// export default router;