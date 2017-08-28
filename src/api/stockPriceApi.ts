import * as promiseRetry from "promise-retry";
import { StocksService } from "../businessServices/stocksService";
import { StockPrice } from "../models/stockPrice";

import { NextFunction, Request, Response, Router } from "express";

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

        const stockServie = new StocksService();
        promiseRetry({ retries: 20,  maxTimeout: 150, minTimeout: 100  }, (retry, nr) => {
            // tslint:disable-next-line:no-console
            console.log("attempt number", nr);

            return stockServie.getCurrentStockPrices(symbol.toUpperCase()).catch(retry);
        }).then((price) => res.send(price), (error) => res.status(500).send({ error }));
    }

    public getMostTraded(req: Request, res: Response, next: NextFunction) {
        const mostTradedStocks = '"BMW.DE", "BAYN.DE", "SIE.DE", "ALV.DE", "ADS.DE"';

        const fallbackData = [{ "change": -0.08, "date": "2017-08-28T19:05:27.121Z", "price": "79.21", "symbol": "BMW.DE", "name": "BAY.MOTOREN WERKE AG ST" }, { "change": -0.05, "date": "2017-08-28T19:05:27.121Z", "price": "108.95", "symbol": "BAYN.DE", "name": "BAYER AG NA O.N." }, { "change": 0.05, "date": "2017-08-28T19:05:27.121Z", "price": "110.90", "symbol": "SIE.DE", "name": "SIEMENS AG NA" }, { "change": -0.85, "date": "2017-08-28T19:05:27.121Z", "price": "181.35", "symbol": "ALV.DE", "name": "ALLIANZ SE NA O.N." }, { "change": -2.4, "date": "2017-08-28T19:05:27.121Z", "price": "185.30", "symbol": "ADS.DE", "name": "ADIDAS AG NA O.N." }]

        const stockServie = new StocksService();
        promiseRetry({ retries: 20,  maxTimeout: 150, minTimeout: 100 }, (retry, nr) => {
            // tslint:disable-next-line:no-console
            console.log("attempt number", nr);

            return stockServie.getCurrentStockPrices(mostTradedStocks).catch(retry);
        }).then((price) => res.send(price), (error) => res.send(fallbackData));
    }
}
