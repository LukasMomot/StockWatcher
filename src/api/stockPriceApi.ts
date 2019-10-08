import { middleware as cache } from "apicache";
import { NextFunction, Request, Response, Router } from "express";
import * as promiseRetry from "promise-retry";
import { StocksAVService } from "../businessServices/stocksAVService";

/**
 * StockPriceApi
 */
export class StockPriceApi {
    public static configureRoutes(router: Router) {
        router.use("/", (req: Request, res: Response, next: NextFunction) => {
            res.send("StockWatcher API is up and running...");
        });

        // Use caching to prevent too many calls to exteranl API
        router.get("/stockprice/:symbol", cache("1 minute"), (req: Request, res: Response, next: NextFunction) => {
            new StockPriceApi().getStockPrice(req, res, next);
        });

        router.get("/mosttraded", (req: Request, res: Response, next: NextFunction) => {
            new StockPriceApi().getMostTraded(req, res, next);
        });
    }

    public getStockPrice(req: Request, res: Response, next: NextFunction) {
        console.log("Get stock executed");
        const symbol: string = req.params.symbol;

        const stockServie = new StocksAVService();
        // TODO: remove this promise retry because the error is caused by Alphavanted API limitations
        promiseRetry({ retries: 5, maxTimeout: 300, minTimeout: 100 }, (retry, nr) => {
            console.log("attempt number", nr);

            return stockServie.getCurrentStockPrice(symbol.toUpperCase()).catch(retry);
        }).then((price) => {
            res.send(price);
        },
            (error) => res.status(500).send({ error }));
    }

    public getMostTraded(req: Request, res: Response, next: NextFunction) {
        const fallbackData = [{ change: -0.08, date: "2017-08-28T19:05:27.121Z", price: "61.25", symbol: "ATVI", name: "Activision Blizzard" },
        { change: -0.05, date: "2017-08-28T19:05:27.121Z", price: "46.62", symbol: "INTC", name: "Intel Corp." },
        { change: 0.05, date: "2017-08-28T19:05:27.121Z", price: "84.43", symbol: "MSFT", name: "Microsoft Corp." },
        { change: -0.85, date: "2017-08-28T19:05:27.121Z", price: "174.76", symbol: "AAPL", name: "Apple Inc." },
        {
            change: -2.4, date: "2017-08-28T19:05:27.121Z", price: "209.25", symbol: "NVDA",
            name: "Nvidia Corporation"
        }];

        // IMPORTANT: Data is mocked because Alphavanted has a limit of 5 requests per minute. So we are sending just mocked data
        res.send(fallbackData);
    }
}
