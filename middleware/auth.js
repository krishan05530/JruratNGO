
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        //extract token
        console.log("befor Token Exxtraction");
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");

            console.log("After Token Exxtraction");
        //if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'TOken is missing',
            });
        }

         //verify the token
         try{
        
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode",decode); /// thsi decode consist the role as well  // we hve send in auth controller payload
            req.user = decode; // req me jo user obj he usme decode daal do, now req ke under hi hmune apna payload daal diya he , jisme user.id bhi he
            // yaha pe auth bale middlware me , hum user ko verify krke ,user ko req ki body me daal diy he , futere me req ki body se user.id fetch kar sakte he
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
      
        console.log("existng auth");
        next();


    }
    catch (error) {
   return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}


//Role based authorization
exports.isUser = async (req, res, next) => {
    try{
        console.log("entering user isUser");
           if(req.user.accountType !== "User") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for User only',
               });
           }
           console.log("User is verified");
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }
   

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        console.log("entering user isAdmin");
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           console.log("Admin is verified");
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }






   