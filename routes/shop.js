const express=require('express');
const path=require('path');
const router=express.Router();


const productController=require('../controllers/product.js');


router.get('/shop',productController.getShopProduct);

router.get('/product',productController.getProduct);

router.get('/product/:productId',productController.getProductId);

router.get('/index',productController.getIndex)

router.post('/cart/delete',productController.deleteCartProduct);

router.get('/cart',productController.getCart)

router.post('/cart',productController.postCart);

router.get('/order',productController.getOrder)

router.get('/checkout',productController.getCheckout)

module.exports = router;