"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogItemSourceEnum = exports.LogItemTypeEnum = void 0;
var LogItemTypeEnum;
(function (LogItemTypeEnum) {
    LogItemTypeEnum["ERROR"] = "error";
    LogItemTypeEnum["WARNING"] = "warning";
    LogItemTypeEnum["SUCCESS"] = "success";
    LogItemTypeEnum["INFO"] = "info";
})(LogItemTypeEnum = exports.LogItemTypeEnum || (exports.LogItemTypeEnum = {}));
var LogItemSourceEnum;
(function (LogItemSourceEnum) {
    LogItemSourceEnum[LogItemSourceEnum["UI"] = 0] = "UI";
    LogItemSourceEnum[LogItemSourceEnum["Backend"] = 1] = "Backend";
})(LogItemSourceEnum = exports.LogItemSourceEnum || (exports.LogItemSourceEnum = {}));
//# sourceMappingURL=log.enum.js.map