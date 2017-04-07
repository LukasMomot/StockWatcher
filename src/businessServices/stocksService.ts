import { StockPrice } from "../models/stockPrice";

import * as yql from "yql";

/**
 * StocksService
 */
export class StocksService {
    public getCurrentStockPrice(symbol: string): Promise<StockPrice> {
        const promise = new Promise<StockPrice>((resolve, reject) => {
            yql("select * from yahoo.finance.quote where symbol in (@symbol)", {
                env: "store://datatables.org/alltableswithkeys",
            })
                .setParam("symbol", symbol)
                .exec((error, response) => {
                    if (error) {
                        reject(error.message);
                    }

                    const price: StockPrice = {
                        symbol,
                        price: response.query.results.quote.LastTradePriceOnly,
                        change: +response.query.results.quote.Change,
                        date: new Date(),
                    };

                    resolve(price);
                });

        });

        return promise;
    }
}
