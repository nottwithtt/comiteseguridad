"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var eventSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    durationinhours: { type: Number, required: true },
    dateend: { type: Date, required: true }
});
exports.default = mongoose_2.default.model("Event", eventSchema);
