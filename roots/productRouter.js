import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductByID, updateProduct } from "../controller/productController.js";

const productRouter=express.Router();

productRouter.get("/",getAllProducts);
productRouter.post("/",createProduct);
productRouter.put("/:productID",updateProduct);
productRouter.delete("/:productID",deleteProduct);
productRouter.get("/:productID",getProductByID)

export default productRouter;