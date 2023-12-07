import {
  allUsers,
  login,
  Create,
  CreateExercise,
  ShowExercises,
} from "../controller/controller";

const router = require("express").Router();
router.get("/", allUsers);
router.post("/showExercises", ShowExercises);
router.post("/login", login);
router.post("/", Create);
router.post("/createExercise/:username", CreateExercise);
export { router };
