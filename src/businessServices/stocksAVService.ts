import * as _ from "lodash";
import * as unirest from "unirest";

import { StockPrice } from "../models/stockPrice";

export class StocksAVService {

    public getCurrentStockPrice(symbol: string): Promise<StockPrice> {
        const apiKey = this.getApiKey();
        const promise = new Promise<any>((resolve, reject) => {
            unirest.get("https://www.alphavantage.co/query")
                .query({
                    function: "TIME_SERIES_INTRADAY",
                    datatype: "json",
                    interval: "1min",
                    apikey: apiKey,
                    symbol,
                }).end((response) => {
                    console.log(response.request.href);
                    let currentPrice = 0;
                    let stock: StockPrice;

                    try {
                        if (response && response.body && !response.body.Note) {
                            const first = Object.keys(response.body["Time Series (1min)"])[0];
                            const priceEntry = response.body["Time Series (1min)"][first];
                            currentPrice = _.toNumber(priceEntry["4. close"]);
                        } else if (response && response.body.Note) {
                            // There is a limit of calling alphavanted API
                            console.error(response.body.Note);
                            // reject(response.body.Note);
                        }
                    } catch (error) {
                        console.log(error);
                        reject(error);
                    } finally {
                        stock = {
                            symbol,
                            price: currentPrice,
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

    private getApiKey() {
        const apiKeys = [
            "PBYQ6D6Y5P0OXD2I",
            "3A5UT2Y4E5GCDWX8",
            "G8RHU88DI33Z38FQ",
            "DBMUMV9S7DUA6O30",
            "2QZNT6MSWOAUNOOX"
        ];
        const keyIndex = _.random(0, apiKeys.length - 1);

        return apiKeys[keyIndex];
    }
}
