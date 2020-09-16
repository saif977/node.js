const Product=require('../model/product')
const fs=require('fs');
const path=require('path');
const filePath=path.join(__dirname,'../','datas','data.json');


exports.getAddproduct=(req,res,next)=>{
    res.render('admin/add',{
        path:'/admin/add',
        editMode:false
    }) }

exports.postAddproduct=(req,res,next)=>{
    const title=req.body.title;
    const url=req.body.url;
    const price=req.body.price;
    const description=req.body.description;
    const prdct=new Product(null,title,url,price,description);
    console.log('prd',prdct);
    prdct.save();
    res.redirect('/product/shop');
}    

exports.getEditProduct=(req,res,next)=>{
    const id=req.params.prodId;
    Product.findProduct(id,(product)=>{
        product.price=product.price.trim(); 
        res.render('admin/edit-product',{
            path:'admin/edit-product',
            editMode:true,
            product:product
        });   
    })
    
}

exports.postEdited=(req,res,next)=>{
    const id=req.body.id;
   // console.log(id);
    const title=req.body.title;
    const url=req.body.url;
    const price=req.body.price;
    const description=req.body.description;
    
    const p=new Product(id,title,url,price,description);
    p.save();
    res.redirect('/admin/products');
}

exports.getProducts=(req,res,next)=>{
    Product.fetchAll(pr=>{
        res.render('admin/products',{
            path:'/admin/products',
            items:pr
        })
    })
}

exports.postDeleteProduct=(req,res,next)=>{
    const id=req.body.id;
    Product.delete(id,()=>{
      res.redirect('/admin/products');
    });
    
}