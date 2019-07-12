import * as promiseRetry from "promise-retry";
import { StocksService } from "../businessServices/stocksService";
import { StockPrice } from "../models/stockPrice";

import { NextFunction, Request, Response, Router } from "express";
import { StocksAVService } from "../businessServices/stocksAVService";

/**
 * StockPriceApi
 */
export class StockPriceApi {
    public static configureRoutes(router: Router) {
        router.get("/stockprice/:symbol", (req: Request, res: Response, next: NextFunction) => {
            new StockPriceApi().getStockPrice(req, res, next);
        });

        router.get("/mosttraded", (req: Request, res: Response, next: NextFunction) => {
            new StockPriceApi().getMostTraded(req, res, next);
        });
    }

    public getStockPrice(req: Request, res: Response, next: NextFunction) {
        const symbol: string = req.params.symbol;

        const stockServie = new StocksAVService();
        promiseRetry({ retries: 5,  maxTimeout: 300, minTimeout: 100  }, (retry, nr) => {
            // tslint:disable-next-line:no-console
            console.log("attempt number", nr);

            return stockServie.getCurrentStockPrice(symbol.toUpperCase()).catch(retry);
        }).then((price) => res.send(price), (error) => res.status(500).send({ error }));
    }

    public getMostTraded(req: Request, res: Response, next: NextFunction) {
        const mostTradedStocks = '"BMW.DE", "BAYN.DE", "SIE.DE", "ALV.DE", "ADS.DE"';

        // tslint:disable-next-line:max-line-length
        const fallbackData = [{ change: -0.08, date: "2017-08-28T19:05:27.121Z", price: "61.25", symbol: "ATVI", name: "Activision Blizzard" },
                             // tslint:disable-next-line:max-line-length
                             { change: -0.05, date: "2017-08-28T19:05:27.121Z", price: "46.62", symbol: "INTC", name: "Intel Corp." },
                             // tslint:disable-next-line:max-line-length
                             { change: 0.05, date: "2017-08-28T19:05:27.121Z", price: "84.43", symbol: "MSFT", name: "Microsoft Corp." },
                             // tslint:disable-next-line:max-line-length
                             { change: -0.85, date: "2017-08-28T19:05:27.121Z", price: "174.76", symbol: "AAPL", name: "Apple Inc." },
                             { change: -2.4, date: "2017-08-28T19:05:27.121Z", price: "209.25", symbol: "NVDA",
                                name: "Nvidia Corporation" }];

        // TODO: Mock-Data done for Yahoo finance problems
        res.send(fallbackData);

        // const stockServie = new StocksService();
        // promiseRetry({ retries: 20,  maxTimeout: 150, minTimeout: 100 }, (retry, nr) => {
        //     // tslint:disable-next-line:no-console
        //     console.log("attempt number", nr);

        //     return stockServie.getCurrentStockPrices(mostTradedStocks).catch(retry);
        // }).then((price) => res.send(price), (error) => res.send(fallbackData));
    }
}
