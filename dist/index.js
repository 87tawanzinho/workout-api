"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./routes/routes");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(routes_1.router);
const mongoDB = require("./database/mongoose");
mongoDB;
app.listen(3200, () => {
    console.log("server");
});
//# sourceMappingURL=index.js.map