const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    photo: {
        type: String,
    },
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    }, ],
    createdAt: {
        type: String,
        default: new Date(Date.now()),
    },
});

module.exports = mongoose.model("User", UserSchema);