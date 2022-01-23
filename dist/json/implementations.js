"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConfigurationProvider = exports.FileConfigurationProvider = exports.ConfigurationProvider = exports.JsonConfigurationBuilder = exports.JsonConfigurationSource = void 0;
var JsonConfigurationSource = /** @class */ (function () {
    function JsonConfigurationSource() {
    }
    /**
     * @description This is the interface for the configuration of the application.
     */
    JsonConfigurationSource.prototype.build = function (builder) {
        return new JsonConfigurationProvider(this);
    };
    return JsonConfigurationSource;
}());
exports.JsonConfigurationSource = JsonConfigurationSource;
var JsonConfigurationBuilder = /** @class */ (function () {
    function JsonConfigurationBuilder() {
        this.sources = [];
    }
    JsonConfigurationBuilder.prototype.add = function (source) {
        this.sources.push(source);
        return this;
    };
    JsonConfigurationBuilder.prototype.build = function () {
        throw new Error("Method not implemented.");
    };
    return JsonConfigurationBuilder;
}());
exports.JsonConfigurationBuilder = JsonConfigurationBuilder;
var ConfigurationProvider = /** @class */ (function () {
    function ConfigurationProvider(source) {
        this.source = source;
    }
    ConfigurationProvider.prototype.get = function (key) {
        throw new Error("Method not implemented.");
    };
    ConfigurationProvider.prototype.set = function (key, value) {
        throw new Error("Method not implemented.");
    };
    ConfigurationProvider.prototype.load = function () {
        throw new Error("Method not implemented.");
    };
    return ConfigurationProvider;
}());
exports.ConfigurationProvider = ConfigurationProvider;
var FileConfigurationProvider = /** @class */ (function (_super) {
    __extends(FileConfigurationProvider, _super);
    function FileConfigurationProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileConfigurationProvider.prototype.get = function (key) {
        throw new Error("Method not implemented.");
    };
    FileConfigurationProvider.prototype.set = function (key, value) {
        throw new Error("Method not implemented.");
    };
    return FileConfigurationProvider;
}(ConfigurationProvider));
exports.FileConfigurationProvider = FileConfigurationProvider;
var JsonConfigurationProvider = /** @class */ (function (_super) {
    __extends(JsonConfigurationProvider, _super);
    function JsonConfigurationProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonConfigurationProvider.prototype.get = function (key) {
        return this.data[key];
    };
    JsonConfigurationProvider.prototype.set = function (key, value) {
    };
    JsonConfigurationProvider.prototype.loadFile = function (text) {
        this.data = JSON.parse(text);
    };
    return JsonConfigurationProvider;
}(FileConfigurationProvider));
exports.JsonConfigurationProvider = JsonConfigurationProvider;
//# sourceMappingURL=implementations.js.map