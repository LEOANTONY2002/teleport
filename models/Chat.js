const mongoose = require("mongoose");

let dt = new Date();

const UserSchema = mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    msg: {
        type: String,
    },
    photo: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: dt,
    },
});

module.exports = mongoose.model("Chat", UserSchema);