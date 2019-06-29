export interface IView {
    id?: number;
    account: number;
    name: string;
    table: string;
    columns: IViewColumn[];
    terms: IViewTerms;
    permissions: IViewPermissions;
    creation_date: string;
    modify_date: string;
}

export interface IViewColumn {
    enabled: boolean;
    searchable: boolean;
    name: string;
    type: IViewColumnType;
    isNull?: boolean;
    default?: any;
    key?: string;
    extra?: string;
}

export interface IViewColumnType {
    type: MySQLColumnType | MSSQLColumnType | PGColumnType;
    args?: string | number | [string | number]
}

export interface IViewTerms {
    one: string;
    many: string;
}

export interface IViewPermissions {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

export enum MySQLColumnType {
    // Number
    TINYINT = "int",
    SMALLINT = "int",
    MEDIUMINT = "int",
    INT = "int",
    BIGINT = "int",
    DECIMAL = "float",
    FLOAT = "float",
    DOUBLE = "float",
    BIT = "float",
    // String
    CHAR = "string",
    VARCHAR = "string",
    BINARY = "binary",
    VARBINARY = "binary",
    TINYBLOB = "string",
    BLOB = "string",
    MEDIUMBLOB = "string",
    LONGBLOB = "string",
    TINYTEXT = "string",
    TEXT = "string",
    MEDIUMTEXT = "string",
    LONGTEXT = "string",
    ENUM = "string",
    SET = "string",
    // Date & Time
    DATE = "datetime",
    TIME = "datetime",
    DATETIME = "datetime",
    TIMESTAMP = "datetime",
    YEAR = "string",
    // Special
    GEOMETRY = "string",
    POINT = "string",
    LINESTRING = "string",
    POLYGON = "string",
    GEOMETRYCOLLECTION = "string",
    MULTILINESTRING = "string",
    MULTIPOINT = "string",
    MULTIPOLYGON = "string",
}

export enum MSSQLColumnType {
    // String
    CHAR = "string",
    VARCHAR = "string",
    TEXT = "string",
    NCHAR = "string",
    NVARCHAR = "string",
    NTEXT = "string",
    BINARY = "binary",
    VARBINARY = "binary",
    IMAGE = "binary",
    // Number
    BIT = "int",
    TINYINT = "int",
    SMALLINT = "int",
    INT = "int",
    BIGINT = "int",
    DECIMAL = "float",
    NUMERIC = "float",
    SMALLMONEY = "float",
    MONEY = "float",
    FLOAT = "float",
    REAL = "float",
    // Date & Time
    DATETIME = "datetime",
    DATETIME2 = "datetime",
    SMALLDATETIME = "datetime",
    DATE = "datetime",
    TIME = "datetime",
    DATETIMEOFFSET = "datetime",
    TIMESTAMP = "datetime",
    // Special
    SQL_VARIANT = "string",
    UNIQUEIDENTIFIER = "string",
    XML = "string",
    CURSOR = "string",
    TABLE = "string",
}

export enum PGColumnType {
    // Number
    SMALLINT = "int",
    INTEGER = "int",
    BIGINT = "int",
    DECIMAL = "float",
    NUMERIC = "float",
    REAL = "float",
    DOUBLE = "float",
    PRECISION = "float",
    SMALLSERIAL = "float",
    SERIAL = "float",
    BIGSERIAL = "float",
    MONEY = "float",
    BOOLEAN = "boolean",
    // String
    VARCHAR = "string",
    CHAR = "string",
    CHARACTER = "string",
    TEXT = "string",
    // BINARY
    BYTEA = "binary",
    // Date & Time
    TIMESTAMP = "datetime",
    TIMESTAMPTZ = "datetime",
    DATE = "datetime",
    TIME = "datetime",
    INTERVAL = "datetime",
    // Geo
    POINT = "string",
    LINE = "string",
    LSEG = "string",
    BOX = "string",
    PATH = "string",
    POLYGON = "string",
    CIRCLE = "string",
    // Network
    CIDR = "string",
    INET = "string",
    MACADDR = "string",
    // Ranges
    INT4RANGE = "string",
    INT8RANGE = "string",
    NUMRANGE = "string",
    TSRANGE = "string",
    TSTZRANGE = "string",
    DATERANGE = "string",
}