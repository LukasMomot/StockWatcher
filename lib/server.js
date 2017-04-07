"use strict";
exports.__esModule = true;
var stocksService_1 = require("./src/businessServices/stocksService");
var greeter_1 = require("./src/greeter");
var greeter = new greeter_1.Greeter("Lukas");
var msg = greeter.greet();
console.log("Server Started...");
console.log("Hello " + msg);
var stocksSrv = new stocksService_1.StocksService();
stocksSrv.getCurrentStockPrice("BMW.DE")
    .then(function (price) { return console.log("The Price dasdfor " + price.symbol + " is " + price.price + ". Change " + price.change); }, function (error) { return console.log(error); });
//# sourceMappingURL=server.js.map