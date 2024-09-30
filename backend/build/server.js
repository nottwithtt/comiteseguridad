"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.TZ = "America/Costa_Rica";
var cors = require("cors");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var MemoryStore = require("memorystore")(session);
var bodyParser = require("body-parser");
var passport = require("passport");
var mongo_config_1 = require("./mongo-config");
var databaseInstance = mongo_config_1.Database.getInstance();
databaseInstance.connect();
var generalRouter = require("./routers/generalRouter");
var express_1 = __importDefault(require("express"));
var expressStatic = express_1.default.static;
var initializePassport = require("./passport-config");
var app = (0, express_1.default)();
// Configuraciones ------------------------------------------------------------------------------
var port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000", // <-- Dirección de la aplicación de React en desarrollo
    //origin: "https://comiteseguridad.onrender.com", // <-- Dirección de la aplicación de React
    credentials: true,
}));
app.use(session({
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
}));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);
console.log("Passport initialized and session middleware configured.");
app.enable("trust proxy");
// Rutas ----------------------------------------------------------------------------------------
app.post("/login", passport.authenticate("local"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send(JSON.stringify({ error: false, message: "SUCCESS_LOGIN" }));
        return [2 /*return*/];
    });
}); });
app.get("/get_user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send(JSON.stringify(req.user));
        return [2 /*return*/];
    });
}); });
app.get("/logout", function (req, res) {
    req.logOut(function () {
        res.send(JSON.stringify({ error: false, message: "SUCCESS_LOGOUT" }));
    });
});
app.use("/general", generalRouter);
app.listen(port);
