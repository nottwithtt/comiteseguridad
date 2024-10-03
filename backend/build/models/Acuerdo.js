"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acuerdo = void 0;
var Acuerdo = /** @class */ (function () {
    function Acuerdo(numeroOrden, descripcion, estado, acuerdoId) {
        this.numeroOrden = numeroOrden;
        this.descripcion = descripcion;
        this.estado = estado;
        this.acuerdoId = acuerdoId || null;
    }
    // Getters
    Acuerdo.prototype.getAcuerdoId = function () {
        return this.acuerdoId;
    };
    Acuerdo.prototype.getNumeroOrden = function () {
        return this.numeroOrden;
    };
    Acuerdo.prototype.getDescripcion = function () {
        return this.descripcion;
    };
    Acuerdo.prototype.getEstado = function () {
        return this.estado;
    };
    // Setters
    Acuerdo.prototype.setAcuerdoId = function (acuerdoId) {
        this.acuerdoId = acuerdoId;
    };
    Acuerdo.prototype.setNumeroOrden = function (numeroOrden) {
        this.numeroOrden = numeroOrden;
    };
    Acuerdo.prototype.setDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    };
    Acuerdo.prototype.setEstado = function (estado) {
        this.estado = estado;
    };
    return Acuerdo;
}());
exports.Acuerdo = Acuerdo;
exports.default = Acuerdo;
