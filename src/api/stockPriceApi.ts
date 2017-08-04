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
        stockServie.getCurrentStockPrices(symbol.toUpperCase())
            .then((price) => res.send(price),
                    (error) => res.status(500).send({ error }));
    }

    public getMostTraded(req: Request, res: Response, next: NextFunction) {
        const mostTradedStocks = '"BMW.DE", "BAYN.DE", "SIE.DE", "ALV.DE", "ADS.DE"';

        const stockServie = new StocksService();
        stockServie.getCurrentStockPrices(mostTradedStocks)
            .then((price) => res.send(price),
                    (error) => res.status(500).send({ error }));
    }
}
