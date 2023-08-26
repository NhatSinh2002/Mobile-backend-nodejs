const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        // Các trường khác mà bạn cần
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
