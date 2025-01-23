const mongoose=require("mongoose");

const resourceSchema=new mongoose.Schema({
    firstName:{
        type:String, required:true,trim:true
    },
    lastName:{
        type:String, required:true, trim:true
    },
    email:{
        type:String, required:true,trime:true
    },

    accountType:{type:String, 
        enum:["Admin","User"], 
        required:true},
    password:
    {
        type:String, required:true
    },
 
    token:{
        type:String,
    }
});

module.exports=mongoose.model("Resource",resourceSchema);



