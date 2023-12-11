import { router } from "./routes/routes";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(router);
const mongoDB = require("./database/mongoose");
mongoDB;

app.listen(process.env.PORT || 3000, () => {
  console.log("server");
});
