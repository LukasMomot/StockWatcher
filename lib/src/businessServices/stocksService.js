"use strict";
exports.__esModule = true;
var stockPrice_1 = require("../models/stockPrice");
var StocksService = (function () {
    function StocksService() {
    }
    StocksService.prototype.getCurrentStockPrice = function () {
        return new stockPrice_1.StockPrice("Vonovia", 35);
    };
    return StocksService;
}());
exports.StocksService = StocksService;
//# sourceMappingURL=stocksService.js.map