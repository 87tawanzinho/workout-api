"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const controller_1 = require("../controller/controller");
const router = require("express").Router();
exports.router = router;
router.get("/", controller_1.allUsers);
router.post("/showExercises", controller_1.ShowExercises);
router.post("/showMetas", controller_1.ShowMetas);
router.delete("/deleteMeta/:userId", controller_1.deleteMeta);
router.delete("/deleteExercise/:userId", controller_1.deleteExercise);
router.post("/login", controller_1.login);
router.post("/", controller_1.Create);
router.post("/createExercise/:username", controller_1.CreateExercise);
router.post("/createMeta/:username", controller_1.CreateMeta);
//# sourceMappingURL=routes.js.map