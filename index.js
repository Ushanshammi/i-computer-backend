import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./roots/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./roots/productRouter.js";



dotenv.config();
const conurl=process.env.MONGO_URL;





mongoose.connect(conurl).then(
    ()=>{
        console.log("connected to mongodb");
    }
);


const app = express();
app.use(cors()) //handel request

app.use(express.json());//middle whare

app.use(
    (req,res,next)=>{

        const authorizationheader=req.header("Authorization")
       
        if(authorizationheader!=null){


                const token=authorizationheader.replace("Bearer ","")
           
               
                

                jwt.verify(token,process.env.JWT_KEY,
                    (error,content)=>{
                           if(content==null){

                            console.log("invalid token")
                            res.status(401).json({
                                message:"invalid token"
                            })
                           
                           }else{
                            console.log(content)
                            request.user=content//req eke user ekt dala adala kenata yavanava
                            next()// next is adala galapena kenata handover
                           }
                    }
                )//dcrypt

        }else{//token nathura yanna deema

            next()
        }
      

        
        

        
    }
)



app.use("/api/users",userRouter);
app.use("/api/products",productRouter);


app.listen(3000,
    ()=>{
        console.log("saver is running")
    }
);
