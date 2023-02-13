"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryWhereOprEnum = exports.QueryAggregateEnum = exports.ServerTypeEnum = void 0;
var ServerTypeEnum;
(function (ServerTypeEnum) {
    ServerTypeEnum["MYSQL"] = "mysql";
    ServerTypeEnum["MYSQL2"] = "mysql2";
    ServerTypeEnum["POSTGRES"] = "pg";
    ServerTypeEnum["SQLITE"] = "sqlite3";
    ServerTypeEnum["BETTER_SQLITE"] = "better-sqlite3";
    ServerTypeEnum["MSSQL"] = "mssql";
    ServerTypeEnum["ORACEL"] = "oracledb";
})(ServerTypeEnum = exports.ServerTypeEnum || (exports.ServerTypeEnum = {}));
var QueryAggregateEnum;
(function (QueryAggregateEnum) {
    QueryAggregateEnum["SUM_DISTINCT"] = "sumDistinct";
    QueryAggregateEnum["SUM"] = "sum";
    QueryAggregateEnum["AVG"] = "avg";
    QueryAggregateEnum["AVG_DISTINCT"] = "avgDistinct";
    QueryAggregateEnum["MIN"] = "min";
    QueryAggregateEnum["MAX"] = "max";
    QueryAggregateEnum["COUNT_DISTINCT"] = "countDistinct";
    QueryAggregateEnum["COUNT"] = "count";
})(QueryAggregateEnum = exports.QueryAggregateEnum || (exports.QueryAggregateEnum = {}));
var QueryWhereOprEnum;
(function (QueryWhereOprEnum) {
    QueryWhereOprEnum["EQ"] = "=";
    QueryWhereOprEnum["NOT_EQ"] = "!=";
    QueryWhereOprEnum["GT"] = ">";
    QueryWhereOprEnum["GTE"] = ">=";
    QueryWhereOprEnum["LT"] = "<";
    QueryWhereOprEnum["LTE"] = "<=";
    QueryWhereOprEnum["IN"] = "in";
    QueryWhereOprEnum["NOT_IN"] = "not in";
    QueryWhereOprEnum["LIKE"] = "LIKE";
})(QueryWhereOprEnum = exports.QueryWhereOprEnum || (exports.QueryWhereOprEnum = {}));
//# sourceMappingURL=server.enum.js.map