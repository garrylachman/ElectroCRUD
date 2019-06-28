import * as Knex from'knex';

export enum ServerType {
    MySQL = "mysql",
    PostgreSQL = "pg",
    OracleDB = "oracledb",
    MSSQL = "mssql"
}

export const serverTypeIdAsEnum = (id: number) => {
    if (id == 1) return ServerType.MySQL;
    if (id == 2) return ServerType.MSSQL;
    if (id == 3) return ServerType.PostgreSQL;
    if (id == 4) return ServerType.OracleDB;
    return null;
}

export class DatabaseService {
    private static instance: DatabaseService;
    private _connection:Knex;

    public static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    private constructor() { }

    public async connect(
        client: string,
        host: string,
        port: number,
        user: string,
        password: string,
        database: string,
    ) {
        if (this._connection) {
            await this._connection.destroy();
        }
        let config:Knex.Config = {
            client: client,
            connection: {
                host: host,
                port: port,
                user: user,
                password: password,
                database: database
            }
        };
        console.log("config", config);
        this._connection = Knex(config);
        console.log("validate", this.connection.client.pool.validate(this.connection.connection()));
    }

    public async disconnect() {
        if (this.connection) {
            await this.connection.destroy();
        } 
    }

    public get connection():Knex {
        return this._connection;
    }
}