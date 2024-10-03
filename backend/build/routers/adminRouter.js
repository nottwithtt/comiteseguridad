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
var router = require("express").Router();
var Controller_1 = require("../controllers/Controller");
var Event_1 = __importDefault(require("../models/Event"));
var controller = Controller_1.Controller.getInstance();
router.post("/event_overlaps", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, description, durationinhours, date, eventid, acuerdos, event, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                description = req.body.description;
                durationinhours = parseInt(req.body.durationinhours);
                date = new Date(req.body.date);
                eventid = req.body.eventId;
                acuerdos = [];
                event = new Event_1.default(name, description, date, durationinhours, acuerdos, eventid);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.checkOverlap(event)];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Comprobación realizada",
                    result: result,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Error desconocido",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/create_event", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, description, durationinhours, date, eventid, acuerdos, event, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                description = req.body.description;
                durationinhours = parseInt(req.body.durationinhours);
                date = new Date(req.body.date);
                eventid = req.body.eventId;
                acuerdos = [];
                event = new Event_1.default(name, description, date, durationinhours, acuerdos, eventid);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.createEvent(event)];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Evento creado",
                    result: result,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Error desconocido",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/update_event", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, description, durationinhours, date, eventid, acuerdos, event, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                description = req.body.description;
                durationinhours = parseInt(req.body.durationinhours);
                date = new Date(req.body.date);
                eventid = req.body.eventId;
                acuerdos = [];
                event = new Event_1.default(name, description, date, durationinhours, acuerdos, eventid);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.updateEvent(event)];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Comprobación realizada",
                    result: result,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                console.error(e_3);
                res.send(JSON.stringify({
                    error: true,
                    message: "Error desconocido",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/delete_event", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var eventid, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventid = req.body.eventId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.deleteEvent(eventid)];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Comprobación realizada",
                    result: result,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Error desconocido",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/create_acuerdo", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, numeroOrden, descripcion, estado, eventoId, newAcuerdo, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, numeroOrden = _a.numeroOrden, descripcion = _a.descripcion, estado = _a.estado, eventoId = _a.eventoId;
                // Validate required fields
                if (!numeroOrden || !descripcion || !estado || !eventoId) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "numeroOrden, descripcion, estado, and eventoId are required.",
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.createAcuerdo(parseInt(numeroOrden), // Parse to number if necessary
                    descripcion, estado, eventoId // Pass eventoId
                    )];
            case 2:
                newAcuerdo = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        error: false,
                        message: "Acuerdo creado exitosamente",
                        result: newAcuerdo,
                    })];
            case 3:
                error_1 = _b.sent();
                console.error(error_1); // Log the error for debugging purposes
                return [2 /*return*/, res.status(500).json({
                        error: true,
                        message: "Error al crear el acuerdo",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put("/update_acuerdo/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, numeroOrden, descripcion, estado, result, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, numeroOrden = _a.numeroOrden, descripcion = _a.descripcion, estado = _a.estado;
                // Validate required fields
                if (!numeroOrden || !descripcion || !estado) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "numeroOrden, descripcion, and estado are required.",
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.updateAcuerdo(id, parseInt(numeroOrden), descripcion, estado)];
            case 2:
                result = _b.sent();
                // Check if the update was successful
                if (!result) {
                    return [2 /*return*/, res.status(404).json({
                            error: true,
                            message: "Acuerdo not found or could not be updated.",
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        error: false,
                        message: "Acuerdo actualizado",
                        result: result,
                    })];
            case 3:
                error_2 = _b.sent();
                console.error(error_2); // Log the error for debugging purposes
                return [2 /*return*/, res.status(500).json({
                        error: true,
                        message: "Error al actualizar el acuerdo",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/acuerdos_evento/:eventoId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var eventoId, acuerdos, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventoId = req.params.eventoId;
                // Validate the eventoId
                if (!eventoId) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "eventoId is required.",
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.getAcuerdosByEventoId(eventoId)];
            case 2:
                acuerdos = _a.sent();
                if (acuerdos.length === 0) {
                    return [2 /*return*/, res.status(404).json({
                            error: false,
                            message: "No Acuerdos found for the given eventoId.",
                            result: [],
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        error: false,
                        message: "Acuerdos retrieved successfully.",
                        result: acuerdos,
                    })];
            case 3:
                error_3 = _a.sent();
                console.error(error_3); // Log the error for debugging purposes
                return [2 /*return*/, res.status(500).json({
                        error: true,
                        message: "Error retrieving Acuerdos.",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Delete Acuerdo
router.delete("/delete_acuerdo/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.deleteAcuerdo(id)];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Acuerdo eliminado",
                    result: result,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Error al eliminar el acuerdo",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/get_all_acuerdos", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, controller.getAllAcuerdos()];
            case 1:
                result = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Lista de acuerdos obtenida",
                    result: result,
                }));
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Error al obtener la lista de acuerdos",
                }));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/check_order_number_exists", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var numeroOrden, result, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                numeroOrden = req.query.numeroOrden;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, controller.checkOrderNumberExists(parseInt(numeroOrden))];
            case 2:
                result = _a.sent();
                res.send(JSON.stringify({
                    error: false,
                    message: "Orden de acuerdo verificada",
                    result: result,
                }));
                return [3 /*break*/, 4];
            case 3:
                e_7 = _a.sent();
                res.send(JSON.stringify({
                    error: true,
                    message: "Error al verificar el número de orden",
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
