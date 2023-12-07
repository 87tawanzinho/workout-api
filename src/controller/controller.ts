import { Request, Response } from "express";
import { UserModel } from "../models/User";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const allUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find();
  res.json(users);
};

const login = async (req: Request, res: Response) => {
  const { user, password } = req.body;
  const userExist = await UserModel.findOne({ user: user });

  if (!userExist) {
    return res.status(400).json({
      error: "Conta não encontrada",
    });
  }
  const checkPassword = await bcrypt.compare(password, userExist.password);
  if (!checkPassword) {
    return res.status(400).json({
      error: "Senha incorreta",
    });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: userExist._id,
        username: userExist.user,
        exercises: userExist.exercises,
      },
      secret
    );
    res.status(200).json({ msg: "sucessfully", token });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

const Create = async (req: Request, res: Response) => {
  try {
    const { user, password } = req.body;

    const userExist = await UserModel.findOne({ user: user });
    if (userExist) {
      return res.status(404).json({ error: "User already exist" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      user,
      password: passwordHash,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const CreateExercise = async (req: Request, res: Response) => {
  const { exercise, data } = req.body;
  const { username } = req.params;

  try {
    const user = await UserModel.findOneAndUpdate(
      { user: username },
      {
        $push: {
          exercises: {
            data: data,
            description: exercise,
          },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const ShowExercises = async (req: Request, res: Response) => {
  const { user } = req.body;

  try {
    const userExercise = await UserModel.findOne({ user: user });

    if (!userExercise) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(userExercise.exercises);
  } catch (error: any) {
    res.status(500).json({ error: error.message } + user);
  }
};

export { allUsers, login, Create, CreateExercise, ShowExercises };
