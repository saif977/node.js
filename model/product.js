const fs=require('fs');
const path=require('path');

const Cart=require('./cart.js')

const { json } = require('body-parser');

const filePath=path.join(__dirname,'../','datas','data.json');

let products=[];

module.exports=class Product {
    constructor(id,title,url,price,description){
        this.id=id;
        this.title=title;
        this.url=url;
        this.price=price;
        this.description=description;
       
    }

    save=()=>{
       fs.readFile(filePath,'utf-8',(err,data)=>{

       if(this.id){
                       console.log('in');
                         let updateProduct;
                         let index;
                         index=JSON.parse(data).findIndex((pr)=>this.id===pr.id); 
                          updateProduct=JSON.parse(data);
                             updateProduct[index]=this;
                          fs.writeFile(filePath,JSON.stringify(updateProduct),err=>{
                              console.log(err);
                          })
                       }
               
      
       else{
     
        console.log('out');

         this.id='';
         
        if(data===''){
            products.push(this);
            fs.writeFile(filePath,JSON.stringify(products),err=>{ console.log(err);})
           }
           else{
               products=JSON.parse(data);
               products.push(this);
               fs.writeFile(filePath,JSON.stringify(products),err=>{ console.log(err);})
           }

       }

       
           

       })
     
    }

    static fetchAll=(cb)=>{
       fs.readFile(filePath,(err,data)=>{
       if(err){
           cb([]);
       }
       else{
           cb(JSON.parse(data));
       }     
       })
    }

    static findProduct=(id,cb)=>{
           fs.readFile(filePath,(err,data)=>{
               if(err)
               cb([]);
               else{
                   const pr=JSON.parse(data).find((p=>p.id===id));
                   cb(pr);
               }
           })
    }

     findProductIndex=(id,cb)=>{
        let index;
        fs.readFile(filePath,(err,data)=>{
            if(!err){
                index=JSON.parse(data).findIndex((pr)=>id===pr.id);
                cb(index);
            }

            else{
                cb();
            }
        })
    }


    
    static delete=(id,cb)=>{
         fs.readFile(filePath,(err,data)=>{
              let updateProduct;
             // console.log('id',id);
              updateProduct=JSON.parse(data);
              const pr=updateProduct.find(p=>p.id===id);
              //console.log(updateProduct);
              updateProduct=updateProduct.filter((pr)=>{
                  return parseInt(pr.id)!=parseInt(id)
            })
             // console.log('up',updateProduct);
             fs.writeFile(filePath,JSON.stringify(updateProduct),(err)=>{console.log(err)});
             Cart.deleteById(id,pr.price);
            cb();

         })  
    }



}
