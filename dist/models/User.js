"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose = require("mongoose");
let User = new mongoose.Schema({
    user: { type: String, require: true },
    password: { type: String, require: true },
    photo_url: String,
    exercises: [
        {
            data: String,
            description: String,
        },
    ],
    cartas: [
        {
            description: String,
        },
    ],
});
const UserModel = mongoose.model("User", User);
exports.UserModel = UserModel;
//# sourceMappingURL=User.js.map