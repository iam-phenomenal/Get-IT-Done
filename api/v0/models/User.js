const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, max: 16},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true, min: 8},
    admin: {type: Boolean, default: false}
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)