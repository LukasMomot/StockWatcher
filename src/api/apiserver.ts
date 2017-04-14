import * as bodyParser from "body-parser";
import * as express from "express";
import { StockPriceApi } from "./stockPriceApi";

/**
 * ApiServer
 */
export class ApiServer {

    public app: express.Application;
    constructor() {
        this.app = express();
    }

    public config(): ApiServer {
        this.configureMiddlewares();
        this.configApiRoutes();

        return this;
    }

    public startServer(port: number) {
        this.app.listen(port, () => console.log(`Listening on port ${port}`));
    }

    private configureMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    private configApiRoutes() {
        let router: express.Router;
        router = express.Router();

        StockPriceApi.configureRoutes(router);

        this.app.use(router);
    }


}