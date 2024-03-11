const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser')
const cors = require("cors");
const AuthRoutes = require("../routes/authRoutes");

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/user", AuthRoutes);


const port = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URI, {}).then(() =>
  app.listen(port, () => {
    console.log(
      `Server is Fire at http://localhost:${port} and mongo conncted`
    );
  })
);
