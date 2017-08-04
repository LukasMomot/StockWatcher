import { StockPrice } from "../models/stockPrice";

import * as yql from "yql";

/**
 * StocksService
 */
export class StocksService {
    public getCurrentStockPrices(symbols: string): Promise<StockPrice[]> {
        const promise = new Promise<StockPrice[]>((resolve, reject) => {
            yql("select * from yahoo.finance.quote where symbol in (@symbol)", {
                env: "store://datatables.org/alltableswithkeys",
            })
                .setParam("symbol", symbols)
                .exec((error, response) => {
                    if (error) {
                        reject(error.message);
                    }

                    const stocks: StockPrice[] = [];
                    response.query.results.quote.forEach((stock) => {
                        const price: StockPrice = {
                            change: +stock.Change,
                            date: new Date(),
                            price: stock.LastTradePriceOnly,
                            symbol: stock.Symbol,
                            // tslint:disable-next-line:object-literal-sort-keys
                            name: stock.Name,
                        };

                        stocks.push(price);
                    });


                    resolve(stocks);
                });

        });

        return promise;
    }
}
