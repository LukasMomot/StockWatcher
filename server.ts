import { StocksService } from "./src/businessServices/stocksService";
import { Greeter } from "./src/greeter";

const greeter = new Greeter("Lukas");

const msg: string = greeter.greet();

const stocksSrv = new StocksService();
stocksSrv.getCurrentStockPrice();

console.log("Server Started...");
console.log(`Hello ${msg}`);

