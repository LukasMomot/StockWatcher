"use strict";
exports.__esModule = true;
var stocksService_1 = require("./src/businessServices/stocksService");
var greeter_1 = require("./src/greeter");
var greeter = new greeter_1.Greeter("Lukas");
var msg = greeter.greet();
var stocksSrv = new stocksService_1.StocksService();
stocksSrv.getCurrentStockPrice();
console.log("Server Started...");
console.log("Hello " + msg);
//# sourceMappingURL=server.js.map