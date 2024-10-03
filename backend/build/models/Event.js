"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event(name, description, date, durationinhours, // Set default value to avoid undefined if not provided
    acuerdos, // Add acuerdos as an optional parameter
    eventId) {
        if (durationinhours === void 0) { durationinhours = 0; }
        if (acuerdos === void 0) { acuerdos = []; }
        this.name = name;
        this.description = description;
        this.date = date;
        this.durationinhours = durationinhours;
        this.acuerdos = acuerdos; // Initialize acuerdos
        this.eventId = eventId || null; // Set eventId if provided, otherwise default to null
    }
    // Getters
    Event.prototype.getEventId = function () {
        return this.eventId;
    };
    Event.prototype.getName = function () {
        return this.name;
    };
    Event.prototype.getDescription = function () {
        return this.description;
    };
    Event.prototype.getDate = function () {
        return this.date;
    };
    Event.prototype.getDurationInHours = function () {
        return this.durationinhours;
    };
    Event.prototype.getAcuerdos = function () {
        return this.acuerdos; // Return acuerdos
    };
    // Setters
    Event.prototype.setEventId = function (eventId) {
        this.eventId = eventId;
    };
    Event.prototype.setName = function (name) {
        this.name = name;
    };
    Event.prototype.setDescription = function (description) {
        this.description = description;
    };
    Event.prototype.setDate = function (date) {
        this.date = date;
    };
    Event.prototype.setDurationInHours = function (durationinhours) {
        this.durationinhours = durationinhours;
    };
    Event.prototype.setAcuerdos = function (acuerdos) {
        this.acuerdos = acuerdos; // Set acuerdos
    };
    return Event;
}());
exports.Event = Event;
exports.default = Event;
