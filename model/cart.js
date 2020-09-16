const path=require('path');
const filePath=path.join(__dirname,'../','datas','cart.json');
const fs=require('fs');

module.exports= class Cart{

    static addProduct=(id,price)=>{
        
        let cart={products:[],totalPrice:0}
         //console.log(cart.totalPrice);
        fs.readFile(filePath,(err,data)=>{
            if(!err){
                 cart=JSON.parse(data);
                
            }

            let exixstingProduct=cart.products.find(p=>p.id===id);
            let updateProduct;

            if(exixstingProduct){
                updateProduct=exixstingProduct;
                 updateProduct.qty+=1;  
                
            }
            else{
                console.log('working');
                updateProduct={id:id,qty:1};
                cart.products.push(updateProduct);
            }
            
            cart.totalPrice= +cart.totalPrice + +price;
           // console.log(cart.totalPrice,price,id)
            fs.writeFile(filePath,JSON.stringify(cart),err=>{
                   console.log(err);
            });
        })
     

    }

    static deleteById=(id,price)=>{
        fs.readFile(filePath,(err,data)=>{
             if(data){
                 const updateProduct=JSON.parse(data);
                 const pr=updateProduct.products.find(p=>p.id===id);
                 if(!pr){return}
                 const prQty=pr.qty;
                 updateProduct.totalPrice-=price*prQty;
                 updateProduct.products=updateProduct.products.filter((p)=>p.id!==id);
                 fs.writeFile(filePath,JSON.stringify(updateProduct),(err)=>console.log(err));
             }
        })
    }

    static getCartProducts=(cb)=>{
        fs.readFile(filePath,(err,data)=>{
            if(!err){
                const CartProds=JSON.parse(data).products;
                cb(CartProds);
            }
        })
    }

}