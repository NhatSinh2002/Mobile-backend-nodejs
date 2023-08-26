const Brand = require("../models/brand");

const brandController = {
    getAllBrands: async (req, res) => {
        try {
            const brands = await Brand.find({});
            res.status(200).json(brands);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getBrandById: async (req, res) => {
        const brandId = req.params.id;

        try {
            const brand = await Brand.findById(brandId);
            if (!brand) {
                return res.status(404).json({ error: 'Brand not found' });
            }
            res.status(200).json(brand);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    createBrand: async (req, res) => {
        try {
            const brand = new Brand(req.body);
            await brand.save();
            res.status(201).json({ status: "success", brand });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateBrandById: async (req, res) => {
        const brandId = req.params.id;

        try {
            const brand = await Brand.findByIdAndUpdate(brandId, req.body, { new: true });
            if (!brand) {
                return res.status(404).json({ error: 'Brand not found' });
            }
            res.status(200).json(brand);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteBrandById: async (req, res) => {
        const brandId = req.params.id;

        try {
            const brand = await Brand.findByIdAndDelete(brandId);
            if (!brand) {
                return res.status(404).json({ error: 'Brand not found' });
            }
            res.status(200).json({ message: 'Brand deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = brandController;
