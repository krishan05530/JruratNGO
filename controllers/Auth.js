
const Resource = require("../models/Resources")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();




exports.signup = async (req, res) => {

    try {
        // data fetch from req body
        const {
            firstName,
            lastName,
            email, password,
            confirmPassword,
            accountType,
        } = req.body;
        // validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "All field requird",
            })
        }


        //  2 password match karo
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password value doesnt match "

            })
        }
        // check user already exist or not

        const existingUser = await Resource.findOne({ email });
        if(existingUser)
        {
            return res.status(400).json({
                success: false,
                message: "user already exist "
            })
        }
        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // entry create in db
        const resource = await Resource.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
        })

        // return res
        return res.status(200).json({
            success: true,
            message: "sign up  succefully",
            resource,
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "user cannot by registered",
            
        })
    }
}


 // login

exports.login=async (req,res)=>{
    try{
       const {email, password}=req.body;
           if(!email || ! password)
           {
            return res.status(403).json({
                success:false,
                message:"All field are required",
            })
           }
           const resource=await Resource.findOne({email});
             
           if(!resource){
            return res.status(401).json({
                success:false,
                message:"user is not registrerd  pls signup  first"
                
            })
           }
           // genrate jwt after password match
           if(await bcrypt.compare(password,resource.password))
           {
            const payload={   // this payload consit the user._id , which we are going to use in auth mddleware
                email:resource.email,
                id:resource._id,
                accountType:resource.accountType,
            }
            // payload, secret , option
            const token=jwt.sign(payload, process.env.JWT_SECRET,{
                 expiresIn:"2h",
            })

            // here i am attching this token with usr
            resource.token=token;
            resource.password=undefined;
           
            // create cookies and send response
            const options={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token, options).status(200).json({
                success:true,
                token,
                resource,
                message:"Logged in succesfuuly"
            })
           }
           else{
            return res.status(401).json({
         success:false,
         message:"Password is incorret",
            })
           }
    }
    catch(error)
    {
        console.log(error);
        return res.status().json({
 success:true,
 message:"login failure pls try again"
        })
    }
}



