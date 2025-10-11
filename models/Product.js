import mongoose from "mongoose"

const productSchema=new mongoose.Schema(

    // products json file
    {
        
        productID : {
            type:String,
            required:true,//definitly must have product ID
            unique : true,//one and only itemm

        },
        name :{
            type:String,
            required:true
        },
        altNames:{//wenath names
            type:[String], //String array

            default : []
        },
        description : {
            type : String,
            required : true
        },

        price : {
            type : Number,
            required:true
        },
        labelPrice:{
            type :Number,
            required:true
        },
        images:{
            type:[String],
            required:true
        },
        category:{
            type:String,
            required:true
        },
        brand:{
            type:String,
            required:true,
            default:"No Brand"
        },
        stock:{
            type:Number,
            required:true,
            default:0
        },
        isAvailable:{
            type:Boolean,
            default:true
        }   

    }

)

//model file

const product=mongoose.model("Product",productSchema);
export default product;