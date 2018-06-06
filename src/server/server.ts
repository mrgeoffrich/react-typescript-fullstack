import * as config from "config";
import * as http from "http";
import { AddressInfo } from "net";
import * as app from "./app";
import { RethinkStore } from "./data/rethinkstore";

const port: number = +(process.env.PORT || config.get("Port") || "3000");
const server: http.Server = http.createServer(app.createApp());
const rethinkStore: RethinkStore = new RethinkStore();

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
            // tslint:disable-next-line:no-console
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            // tslint:disable-next-line:no-console
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const bind: string = typeof server.address() === "string"
        ? "pipe " + server.address()
        : "port " + (server.address() as AddressInfo).port;
    // tslint:disable-next-line:no-console
    console.log("Listening on " + bind);
}

rethinkStore
    .connect(
        [
            "table1",
            "table2",
            "table3"
        ]
    )
    .then(() => {
        server.listen(port);
        server.on("error", onError);
        server.on("listening", onListening);
    })
    .catch((err) => {
        // tslint:disable-next-line:no-console
        console.log(err);
    });
