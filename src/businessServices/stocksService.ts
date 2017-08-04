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

                    // Response from Yahoo can an array or single object
                    if (response.query.results.quote instanceof Array) {
                        response.query.results.quote.forEach((stock) => {
                            const stockPrice = this.buildStockItem(stock);
                            stocks.push(stockPrice);
                        });

                    } else {
                        const stockPrice = this.buildStockItem(response.query.results.quote);
                        stocks.push(stockPrice);
                    }


                    resolve(stocks);
                });

        });

        return promise;
    }

    private buildStockItem(stock: any): StockPrice {
        const stockPrice: StockPrice = {
            change: +stock.Change,
            date: new Date(),
            price: stock.LastTradePriceOnly,
            symbol: stock.Symbol,
            // tslint:disable-next-line:object-literal-sort-keys
            name: stock.Name,
        };

        return stockPrice;

    }
}
