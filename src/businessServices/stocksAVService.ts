import * as alpha from "alphavantage";
import * as _ from "lodash";
import * as unirest from "unirest";

import { StockPrice } from "../models/stockPrice";

export class StocksAVService {

    public getCurrentStockPrice(symbol: string): Promise<any> {
        const promise = new Promise<any>((resolve, reject) => {
            unirest.get("https://www.alphavantage.co/query")
                .query({
                    function: "TIME_SERIES_INTRADAY",
                    // tslint:disable-next-line:object-literal-sort-keys
                    datatype: "json",
                    interval: "1min",
                    apikey: "PBYQ6D6Y5P0OXD2I",
                    symbol,
                }).end((response) => {
                    console.log(response.request.href);

                    // get last price entry
                    let currentPrice = 0;
                    let stock: StockPrice;

                    try {
                        // TODO: Improve this code (done quickly after suddenly Yahoo finance was switched off)
                        const first = Object.keys(response.body["Time Series (1min)"])[0];
                        const priceEntry = response.body["Time Series (1min)"][first];
                        currentPrice = _.toNumber(priceEntry["4. close"]);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        stock = {
                            symbol,
                            price: currentPrice,
                            // tslint:disable-next-line:object-literal-sort-keys
                            date: new Date(),
                            name: symbol,
                            change: 0,
                        };
                    }

                    return resolve(stock);

                });
        });

        return promise;
    }
}
