import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { NextFunction, Request, Response, Router } from "express";
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
        this.app.use(cors());
    }
    private configApiRoutes() {
        let router: Router;
        router = Router();

        StockPriceApi.configureRoutes(router);

        // Configure default route
        router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
            res.send("StockWatcher API is up and running... 4");
        });

        this.app.use(router);
    }
}
