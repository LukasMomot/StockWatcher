import { StockPrice } from "../models/stockPrice";

import * as yql from "yql";

/**
 * StocksService
 */
export class StocksService {
    public getCurrentStockPrice(): StockPrice {
        yql('select * from yahoo.finance.quote where symbol in ("YHOO","AAPL","GOOG","MSFT")', {
            env: "store://datatables.org/alltableswithkeys",
        })
            .exec((error, response) => {
                console.log(error.message);
            });

        return new StockPrice("Vonovia", 35);
    }
}
