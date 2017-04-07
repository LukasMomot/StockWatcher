"use strict";
exports.__esModule = true;
var yql = require("yql");
var StocksService = (function () {
    function StocksService() {
    }
    StocksService.prototype.getCurrentStockPrice = function (symbol) {
        var promise = new Promise(function (resolve, reject) {
            yql("select * from yahoo.finance.quote where symbol in (@symbol)", {
                env: "store://datatables.org/alltableswithkeys"
            })
                .setParam("symbol", symbol)
                .exec(function (error, response) {
                if (error) {
                    reject(error.message);
                }
                var price = {
                    symbol: symbol,
                    price: response.query.results.quote.LastTradePriceOnly,
                    change: +response.query.results.quote.Change,
                    date: new Date()
                };
                resolve(price);
            });
        });
        return promise;
    };
    return StocksService;
}());
exports.StocksService = StocksService;
//# sourceMappingURL=stocksService.js.map