import { ApiServer } from "./src/api/apiserver";
import { StocksService } from "./src/businessServices/stocksService";

console.log("Server Starting...");

const apiServer: ApiServer = new ApiServer();
apiServer.config()
        .startServer(5001);

console.log("Server started!!!")



