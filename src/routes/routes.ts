import {
  allUsers,
  login,
  Create,
  CreateExercise,
  ShowExercises,
  ShowMetas,
  CreateMeta,
  deleteMeta,
  deleteExercise,
} from "../controller/controller";

const router = require("express").Router();
router.get("/", allUsers);
router.post("/showExercises", ShowExercises);
router.post("/showMetas", ShowMetas);
router.delete("/deleteMeta/:userId", deleteMeta);
router.delete("/deleteExercise/:userId", deleteExercise);
router.post("/login", login);
router.post("/", Create);
router.post("/createExercise/:username", CreateExercise);
router.post("/createMeta/:username", CreateMeta);
export { router };
