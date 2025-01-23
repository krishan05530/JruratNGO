const express=require("express");
const app=express();

const authRoutes=require("./routes/authRoutes");
// const resourceRoutes=require("./routes/resourceRoutes");
const resourceRoutes=require("./routes/resourceRoutes");


// connect to all conneection
const database=require("./config/database");
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");
dotenv.config();
const PORT=process.env.PORT || 4000;
database.connect();
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/resource",resourceRoutes);


app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Server is running"
    })
})

// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);
// })

module.exports = app;