import product from "../models/Product.js";
import Product from "../models/Product.js";
import { isAdmin } from "./userController.js";


//create products

export function createProduct(req,res){


    //check admin

    if(! isAdmin(req)){
        res.status(403).json({
            message:"Forbidden"
        })
        return;
    }


    const product=new Product(req.body);
    product.save().then(
        ()=>{
            res.json({
                message:"product create successfully"
            })
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                message:"error creating product",
                error:error.message
            })
        }
    )
}

//view products
export function getAllProducts(req,res){
    if(isAdmin(req)){
        Product.find().then(
            (products)=>{
                res.json(products);
            }
        ).catch(
            (error)=>{
                res.status(500).json({
                    message:"Error fetching products",
                    error:error.message
                })
            }
        )


        
    }else{
        Product.find({isAvailable:true}).then(
            (products)=>{
                res.json(products);
            }
        ).catch(
            (error)=>{
                res.status(500).json({
                    message:"Error fetch products",
                    error:error.message
                })
            }
        )
    }
}




//delete products


export function deleteProduct(req,res){

        if(!isAdmin(req)){
            res.status(403).json({
                message:"Only admin can delete products"
            })
            return
        }

        const productId=req.params.productID;
        Product.deleteOne({productID:productId}).then(

            ()=>{
                res.json({
                    message:"product delete successfully"
                })
            }
        )
}

export function updateProduct(req,res){

    
        if(!isAdmin(req)){
            res.status(403).json({
                message:"Only admin can delete products"
            })
            return
        }

        const productID=req.params.productID;

        Product.updateOne({productID:productID},req.body).then(
            ()=>{
                res.json({
                    message:"Product update successfully"
                })
            }
        )



}


//check send id and get product

export function getProductByID(req,res){

    const ProductID=req.params.productID;

    Product.findOne({ProductID:ProductID}).then(
        (product)=>{
            if(product==null){
                res.status(404).json({
                    message:"Product Not Found"
                })
            }else{
                res.json(product)
            }
        }
        // catch
    ).catch(
            (error)=>{
                res.status(500).json({
                    message:"Error fetch products",
                    error:error.message
                })
            }
        )
}