const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

//đặt hàng sẽ tạp một đơn hàng
router.post('/', auth.user, orderController.createOrder);
//lấy tất cả các đơn hàng của người dùng
router.get('/', auth.user, orderController.getAllOrders);
//hủy đơn hàng
router.patch('/:orderId', auth.user, orderController.cancelOrder);


module.exports = router;
