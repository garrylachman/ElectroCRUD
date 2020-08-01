import * as Knex from'knex';
import { query } from '@angular/animations';

export enum ServerType {
    MySQL = "mysql",
    PostgreSQL = "pg",
    OracleDB = "oracledb",
    MSSQL = "mssql",
    SQLITE3 = "sqlite3"
}

export const serverTypeIdAsEnum = (id: number) => {
    if (id == 1) return ServerType.MySQL;
    if (id == 2) return ServerType.MSSQL;
    if (id == 3) return ServerType.PostgreSQL;
    if (id == 4) return ServerType.OracleDB;
    if (id == 5) return ServerType.SQLITE3;
    return null;
}

export const HeartBeatQueries = {
    [ServerType.OracleDB]: 'select 1 from DUAL',
    [ServerType.MySQL]: 'SELECT 1',
    [ServerType.PostgreSQL]: 'SELECT 1',
    [ServerType.MSSQL]: 'SELECT 1',
    [ServerType.SQLITE3]: 'SELECT 1'
}

export const ListTablesQueries = {
    [ServerType.OracleDB]: 'SELECT table_name FROM user_tables',
    [ServerType.MySQL]: 'SELECT table_name as table_name FROM information_schema.tables WHERE table_schema = ?',
    [ServerType.PostgreSQL]: 'SELECT concat(table_schema, \'.\', table_name) as table_name FROM information_schema.tables WHERE table_type = \'BASE TABLE\' AND table_catalog = ?',
    [ServerType.MSSQL]: 'SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\' AND table_catalog = ?',
    [ServerType.SQLITE3]: `SELECT name AS table_name FROM sqlite_master WHERE type='table'`
}

export const GetPrimaryKeyQueries = {
    ...ListTablesQueries,
    [ServerType.SQLITE3]: `
    SELECT
        m.name AS 'table_name', 
        p.cid AS 'col_id',
        p.name AS 'name',
        p.type AS 'type',
        p.pk AS 'key',
        p.dflt_value AS 'default',
        p.[notnull] AS 'nullable',
        0 as 'length',
        '' as 'extra' 
    FROM sqlite_master m
    LEFT OUTER JOIN pragma_table_info((m.name)) p
    ON m.name <> p.name
    WHERE table_name = ? 
    ORDER BY table_name, col_id
    `,
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
    [ServerType.PostgreSQL]: `select
	a.*,
	b.key
from
	(
	select
		column_name as name,
		column_default as default,
		is_nullable as nullable,
		udt_name as type,
		greatest(character_maximum_length, 0) + greatest(numeric_precision, 0) as length,
		'' as extra
	from
		information_schema.columns
	where
		table_catalog = ?
		and table_schema = split_part(?, '.', 1)
		and table_name = split_part(?, '.', 2))a
left join (
		select pg_attribute.attname as name,
		'PRI' as key
	from
		pg_index,
		pg_class,
		pg_attribute,
		pg_namespace
	where
		pg_class.oid = ?::regclass
		and indrelid = pg_class.oid
		and pg_class.relnamespace = pg_namespace.oid
		and pg_attribute.attrelid = pg_class.oid
		and pg_attribute.attnum = any(pg_index.indkey)
		and indisprimary)b on
	a.name = b.name;`
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

    public async connectSQLite(
        filename: string
    ): Promise<boolean | Error> {
        await this.disconnect();

        let config:Knex.Config = {
            client: 'sqlite3',
            connection: {
              filename: filename
            }
        };
        try {
            this._connection = Knex(config);
        } catch(error) {
            return error;
        }
        return true;
    }

    public async fileConnect(client: string, filename: string): Promise<boolean | Error> {
        await this.disconnect();

        let config:Knex.Config = {
            client: client,
            connection: {
                filename: filename
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
            console.log("activeClient:", this.connection.client.config.client);
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

    public async executeQuery(query: string): Promise<any | Error> {
        console.log("query", query)
        let findResult = ((result: any) => result[0]) as ((result: any) => string | undefined);
        let findResultPG = ((result: any) => result.rows) as ((result: any) => string | undefined);

        try {
            let res = await this.connection.raw(query);
            if (this.activeClient == "pg") {
                return findResultPG(res);
            }
            return findResult(res);
        } catch(error) {
            return error;
        }
    }

    public async listTables(): Promise<string[] | Error> {
        let listTablesQuery = ListTablesQueries[this.activeClient];
        console.log("listTablesQuery", listTablesQuery)
        let bindings: string[] = [ this.connection.client.database() ];
        if (this.activeClient == "sqlite3") {
            bindings = [];
        }
        try {
            let res = await this.connection.raw(listTablesQuery, bindings);
            console.log(res);
            if (this.activeClient == "mysql") {
                return res[0].map(row => row.table_name);
            }
            if (this.activeClient == "pg") {
                return (res as any).rows.map(row => row.table_name);
            }
            if (this.activeClient == "sqlite3") {
                return (res as any).map(row => row.table_name);
            }
        } catch(error) {
            return error;
        }
    }

    public async tableInfo(tableName: string) {
        let tableInfoQuery = GetPrimaryKeyQueries[this.activeClient];
        let bindings: string[] = [ tableName ];
        if (this.activeClient == "mysql") {
            bindings = [ this.connection.client.database(), tableName ];
        }
        if (this.activeClient == "pg") {
            bindings = [ this.connection.client.database(), tableName, tableName, tableName ];
        }
        let findResult = ((result: any) => result[0]) as ((result: any) => string | undefined);
        let findResultPG = ((result: any) => result.rows) as ((result: any) => string | undefined);
        //let findResultSQLite = ((result: any) => result) as ((result: any) => string | undefined);
    
        try {
            let res = await this.connection.raw(tableInfoQuery, bindings);
            console.log(res);
            if (this.activeClient == "sqlite3") {
                return res;
            }
            if (this.activeClient == "pg") {
                return findResultPG(res);
            }
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
            let countRes = await q.clone().clearSelect().count({count: '*'})
            console.log("countRes: ", countRes);

            let res = await q.limit(limit).offset(offset);
            console.log("raw query: ", q.toQuery());

            console.log(res);
            return {
                data: res,
                count: countRes[0]['count']
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