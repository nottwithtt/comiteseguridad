"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var url = "mongodb+srv://nottwithtt:JErZUZrWNjZKSFnl@cluster0.cs9td.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.getInstance = function () {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    };
    Database.prototype.connect = function () {
        mongoose_1.default
            .connect(url)
            .then(function () {
            console.log("Database connection successful");
        })
            .catch(function (err) {
            console.error("Database connection error:", err.message);
        });
    };
    return Database;
}());
exports.Database = Database;
