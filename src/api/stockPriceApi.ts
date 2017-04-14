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
    }

    public getStockPrice(req: Request, res: Response, next: NextFunction) {
        const symbol: string = req.params.symbol;

        const stockServie = new StocksService();
        stockServie.getCurrentStockPrice(symbol.toUpperCase()).then((price) => res.send(price),
            (error) => res.status(500).send({ error }));
    }
}
