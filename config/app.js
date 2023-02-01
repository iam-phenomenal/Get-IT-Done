//Import dependencies
const express = require("express");
const {json, urlencoded} = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { createError } = require("../api/v0/utils/createError");

//Import Routes
const indexRoute = require("../api/v0/routes/index")
const authRoute = require("../api/v0/routes/auth");
const userRoute = require("../api/v0/routes/user");
const taskRoute = require("../api/v0/routes/task");
const adminRoute = require("../api/v0/routes/admin");
//Import database connection
const db = require("./database")

//Initialize database connection
db.on("error", (error)=>console.error(error))
db.once("open", ()=> console.log("Database connected"))

//Instantiate express
const app = express()

app.use(json())
app.use(urlencoded({extended: false}))

app.use(cors())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/v0", indexRoute)
app.use("/api/v0/auth", authRoute)
app.use("/api/v0/user", userRoute)
app.use("/api/v0/task/:userid", taskRoute)
app.use("/api/v0/admin/:userid", adminRoute)

app.get("/logout", (req, res)=>{
    // Destory JWT Token
    jwt.destroy(req.header["Authorization"][1], (err) => {
        if(err) {
            const error = createError(500, err.message)
            return next(error)
        }
        return res.status(200).json({
            message: "User logged out successfully"
        });
    })
})

app.use((req, res, next)=>{
    const error =  createError(404, "Page not found")
    return next(error)
})

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
})

module.exports = app