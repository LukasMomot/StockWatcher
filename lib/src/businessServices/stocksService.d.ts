import { StockPrice } from "../models/stockPrice";
export declare class StocksService {
    getCurrentStockPrice(symbol: string): Promise<StockPrice>;
}
