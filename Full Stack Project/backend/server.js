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
const paymentRoutes = require("./routes/paymentRoutes");

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

let allCustomers = [];
let allSellers = [];
let admin = {};

function addUser(customerId, socId, customerInfo) {
  const checkUser = allCustomers.some((each) => each.customerId === customerId);

  if (!checkUser) allCustomers.push({ customerId, socId, customerInfo });
}

function addSeller(sellerId, socId, sellerInfo) {
  const checkUser = allSellers.some((each) => each.sellerId === sellerId);

  if (!checkUser) {
    allSellers.push({ sellerId, socId, sellerInfo });
  }
}

function findCustomer(customerId) {
  return allCustomers.find((each) => each.customerId === customerId);
}

function findSeller(sellerId) {
  return allSellers.find((each) => each.sellerId === sellerId);
}

function remove(socId) {
  allCustomers = allCustomers.filter((each) => each.socId !== socId);
  allSellers = allSellers.filter((each) => each.socId !== socId);
  admin = {};
}

io.on("connection", (soc) => {
  console.log("socket server is running..");

  soc.on("add_user", (customerId, customerInfo) => {
    addUser(customerId, soc.id, customerInfo);
    io.emit("activeSeller", allSellers);
    io.emit("activeCustomer", allCustomers);
  });

  soc.on("add_admin", (adminInfo) => {
    admin = adminInfo;
    admin.socId = soc.id;

    io.emit("activeSeller", allSellers);
    io.emit("activeAdmin", admin);
  });

  soc.on("add_seller", (sellerId, sellerInfo) => {
    addSeller(sellerId, soc.id, sellerInfo);
    io.emit("activeSeller", allSellers);
    io.emit("activeCustomer", allCustomers);
    io.emit("activeAdmin", admin);
  });

  soc.on("send_seller_message", (messages) => {
    const customer = findCustomer(messages.receivewId);
    if (customer !== "undefined") {
      soc.to(customer.socId).emit("seller_message", messages);
    }
  });

  soc.on("send_customer_message", (messages) => {
    const seller = findSeller(messages.receivewId);
    if (seller !== "undefined") {
      soc.to(seller.socId).emit("customer_messages", messages);
    }
  });

  soc.on("send_message_admin_to_seller", (messages) => {
    const seller = findSeller(messages.receivewId);
    if (seller !== "undefined") {
      soc.to(seller.socId).emit("get_admin_message", messages);
    }
  });

  soc.on("send_message_seller_to_admin", (messages) => {
    if (admin.socId) {
      soc.to(admin.socId).emit("get_seller_message", messages);
    }
  });

  soc.on("disconnect", () => {
    console.log("User disconnected");
    remove(soc.id);
    io.emit("activeSeller", allSellers);
    io.emit("activeCustomer", allCustomers);

    io.emit("activeAdmin", admin);
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
app.use("/api/payment", paymentRoutes);

const port = process.env.PORT;
dbConnect();
server.listen(port, function () {
  console.log(`Server connected successfully on port ${port}!`);
});
