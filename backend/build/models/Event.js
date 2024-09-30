"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event(name, description, date, durationinhours, eventId) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.durationinhours = durationinhours;
        this.eventId = eventId;
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
    return Event;
}());
exports.Event = Event;
exports.default = Event;
