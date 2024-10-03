"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var acuerdoSchema = new mongoose_1.Schema({
    numeroOrden: { type: Number, required: true },
    descripcion: { type: String, required: true },
    estado: { type: String, enum: ["pendiente", "completado"], required: true },
});
// Export model
exports.default = mongoose_2.default.model("Acuerdo", acuerdoSchema);
