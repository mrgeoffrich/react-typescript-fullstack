import * as bunyan from "bunyan";
import * as seq from "bunyan-seq";
import * as config from "config";
import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import * as app from "./app";
import { Dependencies } from "./dependencyManager";

// perhaps global settings for these - using config?
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const port: number = +(process.env.PORT || config.get("Port") || "3000");
const logfilePath = path.join(__dirname, "..", "..", "logs");
const configFilePath = path.join(__dirname, "..", "..", "config");
if (!fs.existsSync(logfilePath)) {
    fs.mkdirSync(logfilePath);
}
const firstRunFileExists = fs.existsSync(path.join(configFilePath, ".firstrun"));
let firstRun = !firstRunFileExists;
if (process.env.FIRSTRUN) {
    firstRun = JSON.parse(process.env.FIRSTRUN) as boolean;
}

const logger = bunyan.createLogger({
    name: "react-typescript-fullstack",
    streams: [
        {
            level: "info",
            path: path.join(logfilePath, "app.log")
        },
        seq.createStream({serverUrl: config.get("Logfiles.SeqUrl")})
    ]
});
const server: http.Server = http.createServer(app.createApp(logfilePath));

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind: string = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const bind: string = typeof server.address() === "string"
        ? "pipe " + server.address()
        : "port " + (server.address() as any).port;
    logger.info("Listening on " + bind);
}

Dependencies().Initialise(server, logger, logfilePath, firstRun).then(() => {
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
}).catch((err) => {
    logger.error(err.message);
    logger.error(JSON.stringify(err));
});
