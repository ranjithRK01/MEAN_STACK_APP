const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//routes
const authRoutes = require("./routes/auth");

//environment variable or you can say constants
env.config();

// mongodb connection
mongoose
  .connect(
    "mongodb+srv://ranjithRk:ranjithRk@sass.8pgut.mongodb.net/ysquare?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRoutes);

app.listen(process.env.PORT || 9005, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
