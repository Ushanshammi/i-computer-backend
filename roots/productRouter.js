import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductByID, updateProduct } from "../controller/productController.js";

const productRouter=express.Router();
//routers
productRouter.get("/",getAllProducts);

productRouter.get("/trending",(req,res)=>{
    res.json({message:"trending products endpoint"})
})

productRouter.post("/",createProduct);
productRouter.put("/:productID",updateProduct);
productRouter.delete("/:productID",deleteProduct);
productRouter.get("/:productID",getProductByID)

//export
export default productRouter;