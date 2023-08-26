const Cart = require("../models/cart");
const Product = require("../models/product");

const cartController = {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: async (req, res) => {
        try {
            const { quantity } = req.body;
            const { productId } = req.params;
            const userId = req.user._id;

            let cart = await Cart.findOne({ userId });

            if (!cart) {
                cart = new Cart({ userId, items: [] });
            }

            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                const product = await Product.findById(productId);
                if (!product) {
                    return res.status(404).json({ error: "Product not found" });
                }

                const newItem = {
                    productId: product._id,
                    quantity,
                    price: product.price,
                    name: product.name,
                    thumbnail: product.thumbnail // Sử dụng trường thumbnail từ đối tượng product
                };

                cart.items.push(newItem);
            }

            cart.calculateTotals();
            await cart.save();

            const populatedCart = await Cart.findOne({ userId }).populate({
                path: 'items.productId',
                select: 'name images',
            });

            res.status(200).json({ cart: populatedCart });
        } catch (error) {
            res.status(500).json({ error: "Failed to add item to cart" });
        }
    },

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartItem: async (req, res) => {
        try {
            const { cartItemId } = req.params;
            const { quantity } = req.body;
            const userId = req.user._id;

            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ error: "Cart not found" });
            }

            // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng hay không
            const cartItem = cart.items.find(
                (item) => item._id.toString() === cartItemId
            );
            if (!cartItem) {
                return res.status(404).json({ error: "Cart item not found" });
            }

            // Cập nhật số lượng sản phẩm
            cartItem.quantity = quantity;

            // Cập nhật tổng số lượng và tổng giá trị của giỏ hàng
            cart.calculateTotals();

            // Lưu giỏ hàng vào cơ sở dữ liệu
            await cart.save();

            const populatedCart = await Cart.findOne({ userId }).populate({
                path: 'items.productId',
                select: 'name images',
            });

            res.status(200).json({ cart: populatedCart });
        } catch (error) {
            res.status(500).json({ error: "Failed to update cart item" });
        }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    deleteCartItem: async (req, res) => {
        try {
            const { cartItemId } = req.params;
            const userId = req.user._id;

            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ error: "Cart not found" });
            }

            // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng hay không
            const cartItemIndex = cart.items.findIndex(
                (item) => item._id.toString() === cartItemId
            );
            if (cartItemIndex === -1) {
                return res.status(404).json({ error: "Cart item not found" });
            }

            // Xóa sản phẩm khỏi giỏ hàng
            cart.items.splice(cartItemIndex, 1);

            // Cập nhật tổng số lượng và tổng giá trị của giỏ hàng
            cart.calculateTotals();

            // Lưu giỏ hàng vào cơ sở dữ liệu
            await cart.save();

            const populatedCart = await Cart.findOne({ userId }).populate({
                path: 'items.productId',
                select: 'name images',
            });

            res.status(200).json({ cart: populatedCart });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete cart item" });
        }
    },

    // Lấy thông tin giỏ hàng của người dùng
    getCart: async (req, res) => {
        try {
            const userId = req.user._id;
            const cart = await Cart.findOne({ userId }).populate({
                path: 'items.productId',
                select: 'name images',
            });
            res.status(200).json({ cart });
        } catch (error) {
            res.status(500).json({ error: "Failed to get cart" });
        }
    }
};

module.exports = cartController;
