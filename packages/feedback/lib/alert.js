var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/alert.tsx
var alert_exports = {};
__export(alert_exports, {
  Alert: () => Alert
});
module.exports = __toCommonJS(alert_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/alert.tsx
var import_react2 = require("@chakra-ui/react");
var Alert = /* @__PURE__ */ __name(({ title, description, icon, status }) => /* @__PURE__ */ import_react.default.createElement(import_react2.Alert, {
  status,
  display: "flex",
  flexDirection: "column"
}, icon ? /* @__PURE__ */ import_react.default.createElement(import_react2.Icon, {
  as: icon,
  boxSize: 10
}) : /* @__PURE__ */ import_react.default.createElement(import_react2.AlertIcon, {
  boxSize: 10
}), /* @__PURE__ */ import_react.default.createElement(import_react2.AlertTitle, {
  display: "flex",
  fontWeight: "extrabold"
}, title), description && /* @__PURE__ */ import_react.default.createElement(import_react2.AlertDescription, {
  display: "flex",
  fontWeight: "light"
}, description)), "Alert");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Alert
});
