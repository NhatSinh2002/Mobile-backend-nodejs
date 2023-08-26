const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

//Routes
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const brandRouter = require("./routes/brand");
const categoryRouter = require("./routes/category");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");


dotenv.config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

async function startServer() {
    try {
        await mongoose.connect(
            process.env.MONGODB_URL
        );
        console.log("Connected to MongoDB");
        app.listen(8000, () => {
            console.log("Server is running...");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

startServer();

//ROUTES
app.use("/v1/product", productRouter);
app.use("/v1/user", userRouter);
app.use("/v1/brand", brandRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/cart", cartRouter);
app.use("/v1/order", orderRouter);