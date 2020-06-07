import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as config from "config";
import * as express from "express";
import * as fs from "fs";
import * as morgan from "morgan";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as uuid from "uuid";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import { registerRoutes } from "./controllers/index";

const isDevMode: boolean = process.env.NODE_ENV === "development" || false;
const isProdMode: boolean = process.env.NODE_ENV === "production" || false;

// add extra fields to the express.Request object
declare global {
    namespace Express {
        // tslint:disable-next-line:interface-name
        interface Request {
            id?: string;
        }
    }
}

morgan.token("id", function getId(req: express.Request): string {
    return req.id;
});

function assignId(req: express.Request, res: express.Response, next: express.NextFunction): void {
    req.id = uuid.v4();
    next();
}

export function createApp(logfilePath: string, logger: any): express.Application {
    const app: express.Application = express();
    const accessLogFilename: string = config.get("Logfiles.AccessFilename");
    const accessLogStream: fs.WriteStream = fs.createWriteStream(path.join(logfilePath, accessLogFilename),
        { flags: "a" });
    if (isDevMode) {
        logger.info("Starting application in development mode.")
        const compiler: webpack.ICompiler = webpack(require( "../webpack/webpack.config.dev.js") as webpack.Configuration);
        app.use(webpackDevMiddleware(compiler, { publicPath: require( "../webpack/webpack.config.dev.js").output.publicPath }));
        app.use(webpackHotMiddleware(compiler));
    }
    app.use(assignId);
    app.use(morgan(config.get("Logfiles.AccessLogFormat"), { stream: accessLogStream }));
    app.use("/public", express.static(path.join(__dirname, "..", "..", "public")));
    if (isProdMode) {
        logger.info("Starting application in production mode.")
        app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
    }
    app.use(favicon(path.join(__dirname, "..", "..", "public", "favicon.ico")));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(compression());
    registerRoutes(app);
    return app;
}
