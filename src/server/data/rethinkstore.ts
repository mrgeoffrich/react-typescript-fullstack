import * as config from "config";
import * as rethinkdb from "rethinkdb";

export class RethinkStore {
    public connection: rethinkdb.Connection;

    public async connect(defaultTables: string[]): Promise<void> {
        const dbName: string = config.get("Rethinkdb.DbName");
        this.connection = await rethinkdb.connect({
            host: config.get("Rethinkdb.Host"),
            port: config.get("Rethinkdb.Port"),
        });
        const dbList: string[] = await rethinkdb.dbList().run(this.connection);
        if (dbList.indexOf(dbName) === -1) {
            await rethinkdb.dbCreate(dbName).run(this.connection);
        }
        const existingTables: string[] = await rethinkdb.db(dbName).tableList().run(this.connection);
        for (let i: number = 0, len: number = defaultTables.length; i < len; i++) {
            if (existingTables.indexOf(defaultTables[i]) === -1) {
                await rethinkdb
                    .db(dbName)
                    .tableCreate(defaultTables[i])
                    .run(this.connection);
            }
        }
    }
}
