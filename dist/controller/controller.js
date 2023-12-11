"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExercise = exports.deleteMeta = exports.CreateMeta = exports.ShowMetas = exports.ShowExercises = exports.CreateExercise = exports.Create = exports.login = exports.allUsers = void 0;
const User_1 = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.UserModel.find();
    res.json(users);
});
exports.allUsers = allUsers;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    const userExist = yield User_1.UserModel.findOne({ user: user });
    if (!userExist) {
        return res.status(400).json({
            error: "Conta não encontrada",
        });
    }
    const checkPassword = yield bcrypt.compare(password, userExist.password);
    if (!checkPassword) {
        return res.status(400).json({
            error: "Senha incorreta",
        });
    }
    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: userExist._id,
            username: userExist.user,
            exercises: userExist.exercises,
        }, secret);
        res.status(200).json({ msg: "sucessfully", token });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.login = login;
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, password } = req.body;
        const userExist = yield User_1.UserModel.findOne({ user: user });
        if (userExist) {
            return res.status(404).json({ error: "User already exist" });
        }
        const salt = yield bcrypt.genSalt(12);
        const passwordHash = yield bcrypt.hash(password, salt);
        const newUser = yield User_1.UserModel.create({
            user,
            password: passwordHash,
        });
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.Create = Create;
const CreateExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { exercise, data } = req.body;
    const { username } = req.params;
    try {
        const user = yield User_1.UserModel.findOneAndUpdate({ user: username }, {
            $push: {
                exercises: {
                    data: data,
                    description: exercise,
                },
            },
        }, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.CreateExercise = CreateExercise;
const CreateMeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description } = req.body;
    const { username } = req.params;
    try {
        const user = yield User_1.UserModel.findOneAndUpdate({ user: username }, {
            $push: {
                cartas: {
                    description: description,
                },
            },
        }, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.CreateMeta = CreateMeta;
const ShowExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    try {
        const userExercise = yield User_1.UserModel.findOne({ user: user });
        if (!userExercise) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(userExercise.exercises);
    }
    catch (error) {
        res.status(500).json({ error: error.message } + user);
    }
});
exports.ShowExercises = ShowExercises;
const ShowMetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    try {
        const userMetas = yield User_1.UserModel.findOne({ user: user });
        if (!userMetas) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(userMetas.cartas);
    }
    catch (error) {
        res.status(500).json({ error: error.message } + user);
    }
});
exports.ShowMetas = ShowMetas;
const deleteExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { idGym } = req.body;
    try {
        const result = yield User_1.UserModel.updateOne({ _id: userId }, { $pull: { exercises: { _id: idGym } } });
        return res.status(200).json({ message: "work deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting carta:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
exports.deleteExercise = deleteExercise;
const deleteMeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { MetaToDelete } = req.body;
    try {
        const result = yield User_1.UserModel.updateOne({ _id: userId }, { $pull: { cartas: { _id: MetaToDelete } } });
        return res.status(200).json({ message: "Carta deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting carta:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
exports.deleteMeta = deleteMeta;
//# sourceMappingURL=controller.js.map