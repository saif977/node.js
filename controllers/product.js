const Product=require('../model/product')
const Cart=require('../model/cart');

exports.getShopProduct=(req,res,next)=>{
    Product.fetchAll(pr=>{
        console.log(pr);
        res.render('product/shop',{
            path:'/product/shop',
            items:pr
        })
    })
}

// shop is same as product in navbar   
exports.getProduct=(req,res,next)=>{
    Product.fetchAll(pr=>{
        res.render('product/product',{
            path:'/product/product',
            items:pr
        })
    })
}

exports.getProductId=(req,res,next)=>{
    console.log(req.params.productId);
    Product.findProduct(req.params.productId,(pr)=>{
        console.log(pr);
    })
}


exports.getIndex=(req,res,next)=>{
    Product.fetchAll(pr=>{
        res.render('product/index',{
            path:'/product/index',
            items:pr
        })
    })
}

exports.getCart=(req,res,next)=>{
    const cartProducts=[];
    Cart.getCartProducts((cartProds)=>{
        Product.fetchAll((allProds)=>{
            cartProds.forEach(p => {
                const pr=allProds.find(prt=>p.id===prt.id);
                if(pr){
                    cartProducts.push({product:pr,qt:p.qty});
                }
            });
            
            res.render('product/cart',{
                path:'/product/cart',
                cartP:cartProducts
            })
        })
    })
       
}

exports.postCart=(req,res,next)=>{
    let productId= req.body.productId;
    let productprice=req.body.productPrice;
    Cart.addProduct(productId,productprice);
    res.redirect('/product/product');    
}

exports.getOrder=(req,res,next)=>{
    res.render('product/order',{
        path:'/product/order',
        
    })
}

exports.deleteCartProduct=(req,res,next)=>{
    const id=req.body.id;
    const price=req.body.price;
    Cart.deleteById(id,price);
    res.redirect('/product/cart');
}

exports.getCheckout=(req,res,next)=>{
    res.render('product/checkout',{
        path:'/product/checkout',
        
    })
}