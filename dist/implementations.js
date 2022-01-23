"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationProvider = exports.ConfigurationBuilder = exports.ConfigurationSource = void 0;
var ConfigurationSource = /** @class */ (function () {
    function ConfigurationSource() {
    }
    /**
     * @description This is the interface for the configuration of the application.
     */
    ConfigurationSource.prototype.build = function (builder) {
        throw new Error("Method not implemented.");
    };
    return ConfigurationSource;
}());
exports.ConfigurationSource = ConfigurationSource;
var ConfigurationBuilder = /** @class */ (function () {
    function ConfigurationBuilder() {
        this.sources = [];
    }
    ConfigurationBuilder.prototype.add = function (source) {
        this.sources.push(source);
        return this;
    };
    ConfigurationBuilder.prototype.build = function () {
        throw new Error("Method not implemented.");
    };
    return ConfigurationBuilder;
}());
exports.ConfigurationBuilder = ConfigurationBuilder;
var ConfigurationProvider = /** @class */ (function () {
    function ConfigurationProvider(config) {
        this.config = config;
    }
    ConfigurationProvider.prototype.get = function (key) {
        throw new Error("Method not implemented.");
    };
    ConfigurationProvider.prototype.set = function (key, value) {
    };
    ConfigurationProvider.prototype.load = function () {
    };
    return ConfigurationProvider;
}());
exports.ConfigurationProvider = ConfigurationProvider;
//# sourceMappingURL=implementations.js.map