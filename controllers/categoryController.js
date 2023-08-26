const Category = require("../models/category");

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find({});
            res.status(200).json(categories);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getCategoryById: async (req, res) => {
        const categoryId = req.params.id;

        try {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    createCategory: async (req, res) => {
        try {
            const category = new Category(req.body);
            await category.save();
            res.status(201).json({ status: "success", category });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateCategoryById: async (req, res) => {
        const categoryId = req.params.id;

        try {
            const category = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteCategoryById: async (req, res) => {
        const categoryId = req.params.id;

        try {
            const category = await Category.findByIdAndDelete(categoryId);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = categoryController;
