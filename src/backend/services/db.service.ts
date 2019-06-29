import * as Knex from'knex';
import { query } from '@angular/animations';

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

export const HeartBeatQueries = {
    [ServerType.OracleDB]: 'select 1 from DUAL',
    [ServerType.MySQL]: 'SELECT 1',
    [ServerType.PostgreSQL]: 'SELECT 1',
    [ServerType.MSSQL]: 'SELECT 1'
}

export const ListTablesQueries = {
    [ServerType.OracleDB]: 'SELECT table_name FROM user_tables',
    [ServerType.MySQL]: 'SELECT table_name FROM information_schema.tables WHERE table_schema = ?',
    [ServerType.PostgreSQL]: 'SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() AND table_catalog = ?',
    [ServerType.MSSQL]: 'SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\' AND table_catalog = ?'
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
    ): Promise<boolean | Error> {
        await this.disconnect();

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
        try {
            this._connection = Knex(config);
        } catch(error) {
            return error;
        }
        return true;
    }

    public async disconnect() {
        if (this.connection) {
            await this.connection.destroy();
        } 
    }

    public get connection():Knex {
        return this._connection;
    }

    private get activeClient(): string {
        try {
            return this.connection.client.config.client;
        } catch(error) {
            console.log("activeClient: ", error);
            return null;
        }
        return null;
    }

    public async heartbeat():Promise<boolean | Error> {
        if (!this.connection || !this.activeClient) {
            console.log("no connection or active client");
            return null
        };

        let heartbeatQuery = HeartBeatQueries[this.activeClient];

        try {
            let res = await this.connection.raw(heartbeatQuery);
            return true;
        } catch(error) {
            return error;
        }
    }

    public async listTables(): Promise<string[] | Error> {
        let listTablesQuery = ListTablesQueries[this.activeClient];
        let bindings: string[] = [ this.connection.client.database() ];
        try {
            let res = await this.connection.raw(listTablesQuery, bindings);
            return res[0].map(row => row.table_name);
        } catch(error) {
            return error;
        }
    }
}