"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var implementations_1 = require("./json/implementations");
var jsonConfigSource = new implementations_1.JsonConfigurationProvider(new implementations_1.JsonConfigurationSource());
jsonConfigSource.loadFile("{ \"connectionString\": \"mongodb://localhost:27017/test\" }");
var connectionString = jsonConfigSource.get('connectionString');
console.log(connectionString);
//# sourceMappingURL=index.js.map