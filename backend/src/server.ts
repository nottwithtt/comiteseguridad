process.env.TZ = "America/Costa_Rica";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const bodyParser = require("body-parser");
const passport = require("passport");
import { Database } from "./mongo-config";
const databaseInstance = Database.getInstance();
databaseInstance.connect();
const generalRouter = require("./routers/generalRouter");
import express from "express";
const expressStatic = express.static;
import { Controller } from "./controllers/Controller";
const initializePassport = require("./passport-config");

const app = express();

// Configuraciones ------------------------------------------------------------------------------

const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- Dirección de la aplicación de React
    credentials: true,
  })
);

app.use(
  session({
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: "none",
    },
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);
console.log("Passport initialized and session middleware configured.");
app.enable("trust proxy");

// Rutas ----------------------------------------------------------------------------------------

app.post("/login", passport.authenticate("local"), async (req, res) => {
  res.send(JSON.stringify({ error: false, message: "SUCCESS_LOGIN" }));
});

app.get("/get_user", async (req, res) => {
  res.send(JSON.stringify(req.user));
});

app.get("/logout", (req, res) => {
  req.logOut(function () {
    res.send(JSON.stringify({ error: false, message: "SUCCESS_LOGOUT" }));
  });
});

app.use("/general", generalRouter);
app.listen(port);
