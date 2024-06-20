const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// config orginal
const corsOptions = {
  // * or ["http1", "http2"] or "truyen cai site muon lay api ma khac port, khac domain"
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use("/assets", express.static(`${__dirname}/../public`));
app.set("views", `${__dirname}/../resources/views`);
app.set("view engine", "ejs");
app.use(
  config.get("app.prefixApiVersion"),
  require(`${__dirname}/../routers/web`)
);

module.exports = app;
