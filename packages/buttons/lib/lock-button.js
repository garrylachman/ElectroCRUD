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

// src/lock-button.tsx
var lock_button_exports = {};
__export(lock_button_exports, {
  LockButton: () => LockButton
});
module.exports = __toCommonJS(lock_button_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/lock-button.tsx
var import_react2 = require("@chakra-ui/react");
var import_bs = require("react-icons/bs");
var LockButton = /* @__PURE__ */ __name(({ onClick }) => /* @__PURE__ */ import_react.default.createElement(import_react2.Button, {
  onClick
}, /* @__PURE__ */ import_react.default.createElement(import_react2.Icon, {
  as: import_bs.BsShieldLockFill,
  boxSize: 18
})), "LockButton");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LockButton
});
