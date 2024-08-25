const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { dbConnect } = require("./utilities/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const corsOptions = {
  origin: "http://localhost:3000", // 允许的请求源
  credentials: true, // 允许携带凭证（如 cookies）
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const port = process.env.PORT;
dbConnect();
app.listen(port, function () {
  console.log(`Server connected successfully on port ${port}!`);
});
