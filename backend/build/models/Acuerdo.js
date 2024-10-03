"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Acuerdo = /** @class */ (function () {
    function Acuerdo(numeroOrden, descripcion, estado, eventoId, // Add eventoId to constructor
    acuerdoId) {
        this.numeroOrden = numeroOrden;
        this.descripcion = descripcion;
        this.estado = estado;
        this.eventoId = eventoId; // Assign eventoId
        this.acuerdoId = acuerdoId;
    }
    // Getter methods
    Acuerdo.prototype.getNumeroOrden = function () {
        return this.numeroOrden;
    };
    Acuerdo.prototype.getDescripcion = function () {
        return this.descripcion;
    };
    Acuerdo.prototype.getEstado = function () {
        return this.estado;
    };
    Acuerdo.prototype.getEventoId = function () {
        return this.eventoId; // Add getter for eventoId
    };
    Acuerdo.prototype.getAcuerdoId = function () {
        return this.acuerdoId;
    };
    return Acuerdo;
}());
exports.default = Acuerdo;
