//Import dependencies
const express = require("express");
const {json, urlencoded} = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken")

const { createError } = require("../api/v0/utils/createError");

//Import Routes
const indexRoute = require("../api/v0/routes/index")
const authRoute = require("../api/v0/routes/auth");
const userRoute = require("../api/v0/routes/user");
const taskRoute = require("../api/v0/routes/task");
const adminRoute = require("../api/v0/routes/admin");
const categoryRoute = require("../api/v0/routes/categories");
const statsRoute = require("../api/v0/routes/stats")

//Import database connection
const db = require("./database");

//Initialize database connection
db.on("error", (error)=>console.error(error));
db.once("open", ()=> console.log("Database connected"));

//Instantiate express
const app = express();

app.use(json());
app.use(urlencoded({extended: false}));

app.use(cors());
app.use(helmet());
app.use(morgan("common"));


//Routing requests
app.use("/api/v0/auth", authRoute);
app.use("/api/v0/user", userRoute);
app.use("/api/v0/task", taskRoute);
app.use("/api/v0/admin", adminRoute);
app.use("/api/v0/category", categoryRoute)
app.use("/api/v0/stats", statsRoute)
 
app.get("/logout", (req, res)=>{
    // Log user out
    try{
        console.log(req.header["authorization"][1])
        req.header["authorization"] = null
        // console.log(req.header["authorization"])
    }catch(err){
        return res.status(500).json({error: err.message})
    }
});

app.use((req, res, next)=>{
    const error =  createError(404, "Page not found")
    return next(error)
});

app.use((error, req, res)=>{
    if(error.status == 400){
        res.status(400).json({error: {
            message: error.message
        }})
    }else if(error.status == 401 || error.status == 403){
        res.redirect("/logout")
    }else{
        res.status(error.status).json({
            error: {
                message: error.message
            }
        })
    }
});

module.exports = app;