//Express
const express = require("express");
const app = express();
//Load Configuration
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
//Logging
const morgan = require("morgan");
//OAuth Library
const passport = require("passport");
//Express Session
const session = require("express-session");
//Session Store
const MongoStore = require("connect-mongo");
//ORM
const mongoose = require("mongoose");
//Routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const reviewRouter = require("./routes/review");
//Database Connnection
const connnectDB = require("./config/db");
connnectDB();
//Passport Configuration
require("./config/passport")(passport);
//Express-handlebars
const exphbs = require("express-handlebars");
//Node default path module
const path = require("path");
//PORT
const PORT = process.env.PORT || 5005;

//Morgan Initialization
if (process.env.NODE_ENV === "deveolpment") {
  app.use(morgan("dev"));
}
//Register View Engine
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

//Cookie and Session Initialization
app.use(
  session({
    secret: "Keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(__dirname + "/public"));

//Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/review", reviewRouter);

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

//404
app.use((req, res) => {
  res.status(404);
  res.sendFile("./views/404.html", { root: __dirname });
});
