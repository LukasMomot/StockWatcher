import { StocksService } from "./src/businessServices/stocksService";
import { Greeter } from "./src/greeter";

const greeter = new Greeter("Lukas");
const msg: string = greeter.greet();
console.log("Server Started...");
console.log(`Hello ${msg}`);

const stocksSrv = new StocksService();
stocksSrv.getCurrentStockPrice("BMW.DE")
    .then(
        (price) => console.log(`The Price dasdfor ${price.symbol} is ${price.price}`),
        (error) => console.log(error));



