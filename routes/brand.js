const express = require("express");
const brandController = require("../controllers/brandController");

const router = express.Router();

// GET /brands
router.get("/", brandController.getAllBrands);

// GET /brands/:id
router.get("/:id", brandController.getBrandById);

// POST /brands
router.post("/", brandController.createBrand);

// PATCH /brands/:id
router.patch("/:id", brandController.updateBrandById);

// DELETE /brands/:id
router.delete("/:id", brandController.deleteBrandById);

module.exports = router;
