import express, { request, response } from "express";
import mongoose from "mongoose";

import userRouter from "./roots/userRouter.js";
import jwt from "jsonwebtoken"
import productRouter from "./roots/productRouter.js";

const conurl="mongodb+srv://admin:1234@cluster0.qo5vyec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";//ushan is db name
mongoose.connect(conurl).then(
    ()=>{
        console.log("connected to mongodb");
    }
);


const app = express();


app.use(express.json());//middle whare

app.use(
    (req,res,next)=>{

        const authorizationheader=req.header("Authorization")
       
        if(authorizationheader!=null){

                const token=authorizationheader.replace("Bearer ","")
             

                jwt.verify(token,"secretKey96$2025",
                    (error,content)=>{
                           if(content==null){

                            console.log("invalid token")
                            res.json({
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



app.use("/users",userRouter);
app.use("/products",productRouter);


app.listen(3000,
    ()=>{
        console.log("saver is running")
    }
);
