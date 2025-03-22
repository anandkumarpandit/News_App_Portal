import Ad from "../models/ad.model.js"
import { errorHandler } from "../utils/error.js"

// Create Ad
export const createAd = async (req, res, next) => {
  try {
    const { imageUrl, text } = req.body
    const newAd = new Ad({ imageUrl, text })
    await newAd.save()
    res.status(201).json(newAd)
  } catch (error) {
    next(error)
  }
}

// Get All Ads
export const getAds = async (req, res, next) => {
  try {
    const ads = await Ad.find()
    res.status(200).json(ads)
  } catch (error) {
    next(error)
  }
}

// Update Ad
export const updateAd = async (req, res, next) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedAd) return next(errorHandler(404, "Ad not found"))
    res.status(200).json(updatedAd)
  } catch (error) {
    next(error)
  }
}

// Delete Ad
export const deleteAd = async (req, res, next) => {
  try {
    await Ad.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Ad deleted successfully!" })
  } catch (error) {
    next(error)
  }
}