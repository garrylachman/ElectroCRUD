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

export const GetPrimaryKeyQueries = {
    ...ListTablesQueries,
    [ServerType.MySQL]: `
    SELECT 
        COLUMN_NAME as 'name',
        COLUMN_DEFAULT as 'default',
        IF(STRCMP(IS_NULLABLE, 'true') = 0, true, false) as 'nullable',
        DATA_TYPE as 'type',
        IFNULL(CHARACTER_MAXIMUM_LENGTH, 0)+IFNULL(NUMERIC_PRECISION, 0) as 'length',
        COLUMN_KEY as 'key',
        EXTRA as 'extra' 
    FROM information_schema.columns WHERE table_schema = ? and table_name = ?
    `,
    [ServerType.PostgreSQL]: `SELECT
    c.column_name, c.data_type
    FROM
    JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_name)
    JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name
    where constraint_type = 'PRIMARY KEY' and tc.table_name = ?;`
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

    public async tableInfo(tableName: string) {
        let tableInfoQuery = GetPrimaryKeyQueries[this.activeClient];
        let bindings: string[] = [ this.connection.client.database(), tableName ];
        let findResult = ((result: any) => result[0]) as ((result: any) => string | undefined);
    
        try {
            let res = await this.connection.raw(tableInfoQuery, bindings);
            return findResult(res);
        } catch(error) {
            return error;
        }
    }

    public async readData(
        table: string, 
        columns: string[], 
        limit: number, 
        offset:number, 
        searchColumns?: string[], 
        searchText?: string,
        where?: { 
            column: string, 
            opr: string, 
            value: string,
            or: boolean
        }[],
        join?: {
            table: string;
            on: {
                local: string,
                target: string,
                opr: string
            }
        }[]
    ): Promise<any | Error> {
        console.log("join", join);
        try {
            let selectColumns = [...columns].map(col => !col.includes(".") ? `${table}.${col}` : `${col} as ${col}`)

            let q = this.connection.select(...selectColumns).from(table);

            if (join) {
                join.forEach((j) => {
                    q = q.leftJoin(j.table, `${table}.${j.on.local}`, `${j.table}.${j.on.target}`)
                })
            }

            if (searchColumns && searchText) {
                q = q.whereWrapped((wq) => {
                    searchColumns.forEach((sCol: string, idx: number) => {
                        if (!sCol.includes(".")) {
                            sCol = `${table}.${sCol}`;
                        }
                        if (idx ==0)    {
                            wq  = wq.where(sCol, 'like', `%${searchText}%`);
                        } else {
                            wq = wq.orWhere(sCol, 'like', `%${searchText}%`);
                        }
                    });
                    return wq;
                })
            }
            if (where) {
                where.forEach((col, idx:number) => {
                    let wCol = col.column;
                    if (!wCol.includes(".")) {
                        wCol = `${table}.${wCol}`;
                    }
                    if (idx == 0) {
                        // if we have where before (from search) we must use andWhere, if no search use where
                        let firstWhereFunc = (searchColumns && searchText) ? "andWhere" : "where";
                        q = q[firstWhereFunc](col.column, col.opr, col.value);
                    } else {
                        let whereFunc = col.or ? "orWhere" : "andWhere";
                        q = q[whereFunc](col.column, col.opr, col.value);
                    }
                })
            }
            let countRes = await q.clone().count();
            console.log("countRes: ", countRes);

            let res = await q.limit(limit).offset(offset);
            console.log("raw query: ", q.toQuery());

            console.log(res);
            return {
                data: res,
                count: countRes[0]['count(*)']
            };
        } catch(error) {
            return error;
        }
    }
    
    public async updateData(
        table: string, 
        update: {
            [key:string]: any
        }, 
        where?: { 
            column: string, 
            opr: string, 
            value: string,
            or: boolean
        }[]
    ): Promise<boolean | Error> {
        try {
            let q = this.connection
                .table(table);
            
            where.forEach((col, idx: number) => {
                if (idx == 0) {
                    q = q.where(col.column, col.opr, col.value);
                } else {
                    let whereFunc = col.or ? "orWhere" : "andWhere";
                    q = q[whereFunc](col.column, col.opr, col.value);
                }
            });

            q.update(update);
            let res = await q;

            console.log(res);
            return true;
        } catch(error) {
            return error;
        }
    }

    public async insertData(
        table: string, 
        data: {
            [key:string]: any
        }
    ): Promise<boolean | Error> {
        try {
            let q = this.connection
                .table(table);

            q.insert(data);
            let res = await q;

            console.log(res);
            return true;
        } catch(error) {
            return error;
        }
    }

    public async deleteData(
        table: string, 
        where?: { 
            column: string, 
            opr: string, 
            value: string,
            or: boolean
        }[]
    ): Promise<boolean | Error> {
        try {
            let q = this.connection
                .table(table);
            
            where.forEach((col, idx: number) => {
                if (idx == 0) {
                    q = q.where(col.column, col.opr, col.value);
                } else {
                    let whereFunc = col.or ? "orWhere" : "andWhere";
                    q = q[whereFunc](col.column, col.opr, col.value);
                }
            });

            let res = await q.delete();
            console.log(res);
            return true;
        } catch(error) {
            return error;
        }
    }

    public async readWidgetData(
        table: string, 
        column: string, 
        distinct: boolean, 
        func: string, 
        where?: { 
            column: string, 
            opr: string, 
            value: string,
            or: boolean
        }[]
    ): Promise<any | Error> {
        console.log("where", where);
        try {

            let aggFunc = func.toLowerCase();
            if (distinct) {
                aggFunc = `${aggFunc}Distinct`;
            }
            let q = this.connection[aggFunc]({
                a: column
            }).from(table);

            if (where) {
                where.forEach((col, idx:number) => {
                    if (idx == 0) {
                        q = q.where(col.column, col.opr, col.value);
                    } else {
                        let whereFunc = col.or ? "orWhere" : "andWhere";
                        q = q[whereFunc](col.column, col.opr, col.value);
                    }
                })
            }
            console.log("raw query: ", q.toQuery())
            let res = await q;

            console.log(res);
            return {
                data: res[0]['a']
            };
        } catch(error) {
            return error;
        }
    }

}