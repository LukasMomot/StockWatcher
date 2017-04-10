import { StocksService } from "./src/businessServices/stocksService";

console.log("Server Started...");

const stocksSrv = new StocksService();
stocksSrv.getCurrentStockPrice("BMW.DE")
    .then(
        (price) => console.log(`The Price for ${price.symbol} is ${price.price}. Change ${price.change}`),
        (error) => console.log(error));



