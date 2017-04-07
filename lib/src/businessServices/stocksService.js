"use strict";
exports.__esModule = true;
var stockPrice_1 = require("../models/stockPrice");
var yql = require("yql");
var StocksService = (function () {
    function StocksService() {
    }
    StocksService.prototype.getCurrentStockPrice = function () {
        yql('select * from yahoo.finance.quote where symbol in ("YHOO","AAPL","GOOG","MSFT")', {
            env: "store://datatables.org/alltableswithkeys"
        })
            .exec(function (error, response) {
            console.log(error.message);
        });
        return new stockPrice_1.StockPrice("Vonovia", 35);
    };
    return StocksService;
}());
exports.StocksService = StocksService;
//# sourceMappingURL=stocksService.js.map