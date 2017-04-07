import { StockPrice } from "../models/stockPrice";
/**
 * StocksService
 */
export class StocksService {
  public getCurrentStockPrice(): StockPrice {
      return new StockPrice("Vonovia", 35);
   }
}
