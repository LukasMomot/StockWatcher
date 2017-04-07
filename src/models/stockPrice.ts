export class StockPrice {

    public symbol: string;
    public price: number;

    constructor(symbol: string, price: number) {
        this.price = price;
        this.symbol = symbol;
    }
}
