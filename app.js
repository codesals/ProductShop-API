const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const path = require("path");
const productRoutes = require("./routes/products");
const homeRoute = require("./routes/home");

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //replacing body parser
app.use(homeRoute);
app.use("/products", productRoutes);
// app.use((request, response, next) => {
//   console.log("I'm the middleware!");
//   request.url = "/products";
//   next();
// });

// console.log(__dirname);
// app.use("/media", express.static(path.join(__dirname, "media")));

//with db connection
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true }); //alter:true to allow altering data (e.g. adding columns when .define() is updated)
    console.log("Successfully connected to database!");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost: 8000");
  });
};

run();
