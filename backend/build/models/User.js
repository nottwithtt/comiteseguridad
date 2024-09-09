"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(name, email, password, role, userId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.userId = userId;
    }
    User.prototype.getID = function () {
        return this.userId;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.getRole = function () {
        return this.role;
    };
    User.prototype.setID = function (newId) {
        this.userId = newId;
    };
    User.prototype.setName = function (newName) {
        this.name = newName;
    };
    User.prototype.setEmail = function (newEmail) {
        this.email = newEmail;
    };
    User.prototype.setPassword = function (newPassword) {
        this.password = newPassword;
    };
    User.prototype.setRole = function (new_role) {
        this.role = new_role;
    };
    return User;
}());
exports.User = User;
