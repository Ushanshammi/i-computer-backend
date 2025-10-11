import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

    {
        email:{
                type:String,
                required:true, //anivaryen thibiya yuthui
                unique:true //one only email.not same email 2 thing

        },
        firstName:{
            type:String,
            required:true,

        },
        lastName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:"customer"//default value
        },
        isBlocked:{
            type:Boolean,
            default:true
        },
        isEmailVerified:{
            type:Boolean,
            default:false
        },
        image:{
            type:String,
            required:true,
            default:"/default.jpg"
        }
    }
);

const User=mongoose.model("User",userSchema);//model collection name
export default User;