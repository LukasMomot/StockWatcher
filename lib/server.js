"use strict";
exports.__esModule = true;
var greeter_1 = require("./src/greeter");
var greeter = new greeter_1.Greeter("Lukas");
var msg = greeter.greet();
console.log("Server Started...");
console.log("Hello " + msg);
//# sourceMappingURL=server.js.map