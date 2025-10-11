import User from "../models/User.js";
import bcrypt from "bcrypt" //hashing package
import jwd from "jsonwebtoken"//web token package

export function createUser(req,res){

    const  data=req.body
    const hashPassword=bcrypt.hashSync(data.password,10)//hashing password


        const user = new User({

            email : data.email,
            firstName:data.firstName,
            lastName:data.lastName,
            password:hashPassword,
            role:data.role,

        }

        )
       

     user.save().then(
          ()=>{
                res.json({
                    message:"created"
                 
                })
            }
        )


}

//login check users
export function loginUser(req,res){

    const email=req.body.email
    const password=req.body.password

    User.find({email:email}).then(
        (users)=>{

           if(users[0]==null){
            res.json({
                message:"user not found"
            })
           }else{
            const user=users[0];
               

                 const isPasswordCorrect=bcrypt.compareSync(password,user.password)//check hash password


                

                if(isPasswordCorrect){

                     //web token
                 const payload={
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    role:user.role,
                    isEmailVerified:user.isEmailVerified,
                    Image:user.image
                 };

                    const token=jwd.sign(payload,"secretKey96$2025",
                        {
                            expiresIn:"3000s"//token exprie time
                        }
                    )//enctryption part
                    


                    res.json({
                        message:"login successful",
                        token:token //login user id
                    })
                }else{
                    res.status(401).json({
                        message : "invalid password"
                    })
                }
           }

        }
    )
}

// all user admin check

export function isAdmin(req){
    if(req.user==null){
           
           return false
       }
       if(req.user.role!="admin"){
          
           return false
       }
       return true
}