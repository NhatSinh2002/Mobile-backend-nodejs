const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// GET /categories
router.get("/", categoryController.getAllCategories);

// GET /categories/:id
router.get("/:id", categoryController.getCategoryById);

// POST /categories
router.post("/", categoryController.createCategory);

// PATCH /categories/:id
router.patch("/:id", categoryController.updateCategoryById);

// DELETE /categories/:id
router.delete("/:id", categoryController.deleteCategoryById);

module.exports = router;
