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
import * as webpackconfig from "../webpack/webpack.config.dev.js";
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

export function createApp(): express.Application {
    const app: express.Application = express();
    const accessLogFilename: string = config.get("Logfiles.AccessFilename");
    const logPath: string = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath);
    }
    const accessLogStream: fs.WriteStream = fs.createWriteStream(path.join(logPath, accessLogFilename), { flags: "a" });
    if (isDevMode) {
        const compiler: webpack.ICompiler = webpack(webpackconfig as webpack.Configuration);
        app.use(webpackDevMiddleware(compiler, { publicPath: webpackconfig.output.publicPath }));
        app.use(webpackHotMiddleware(compiler));
    }
    app.use(assignId);
    app.use(morgan(config.get("Logfiles.AccessLogFormat"), { stream: accessLogStream }));
    app.use("/public", express.static(path.join(__dirname, "..", "..", "public")));
    if (isProdMode) {
        app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
    }
    app.use(favicon(path.join(__dirname, "..", "..", "public", "favicon.ico")));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(compression());
    registerRoutes(app);
    return app;
}
