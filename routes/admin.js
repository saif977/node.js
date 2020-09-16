const express=require('express');
const path=require('path');
const router=express.Router();


const adminController=require('../controllers/admin.js');

router.get('/add',adminController.getAddproduct);

router.post('/added',adminController.postAddproduct);

router.post('/edited',adminController.postEdited);

router.get('/edit/:prodId',adminController.getEditProduct);

router.get('/products',adminController.getProducts)

router.post('/delete',adminController.postDeleteProduct);

module.exports = router;