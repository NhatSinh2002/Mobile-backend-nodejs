const productController = require("../controllers/productController");
const uploadImage = require('../utils/uploadImage');
const auth = require('../middleware/auth');
const uploadMiddleware = require('../utils/uploadMiddleware');
const router = require("express").Router();


//SEARCH PRODUCTS BY NAME
router.get('/search', productController.searchProductsByName);
//CREATE PRODUCT
router.post('/', productController.createProduct);
//UPLOAD IMAGE
router.post('/photo/:id', auth.user, uploadMiddleware, uploadImage, productController.uploadProductImage);
//GET ALL PRODUCT
router.get('/', productController.getAllProduct);
//GET A PRODUCT
router.get('/:id', productController.getProductById);
//UPDATE PRODUCT
router.patch('/:id', productController.updateProductById);
//DELETE PRODUCT
router.delete('/:id', productController.deleteProductById);
//GET PRODUCT BY BRAND
router.get('/brands/:brandId', productController.getProductsByBrand);
//GET PRODUCT BY CATEGORY
router.get('/categories/:categoryId', productController.getProductsByCategory);


module.exports = router;
