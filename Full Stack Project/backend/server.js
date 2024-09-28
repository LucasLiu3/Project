const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { dbConnect } = require("./utilities/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const chatRoutes = require("./routes/chatRoutes");

const socket = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const allCustomers = [];

function addUser(customerId, socId, customerInfo) {
  const checkUser = allCustomers.some((each) => each.customerId === customerId);

  if (!checkUser) allCustomers.push({ customerId, socId, customerInfo });
}

io.on("connection", (soc) => {
  console.log("socket server is running..");

  soc.on("add_user", (customerId, customerInfo) => {
    addUser(customerId, soc.id, customerInfo);
  });
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/chat", chatRoutes);

const port = process.env.PORT;
dbConnect();
server.listen(port, function () {
  console.log(`Server connected successfully on port ${port}!`);
});
