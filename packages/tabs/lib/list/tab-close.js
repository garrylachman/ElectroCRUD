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

// src/list/tab-close.tsx
var tab_close_exports = {};
__export(tab_close_exports, {
  TabClose: () => TabClose
});
module.exports = __toCommonJS(tab_close_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/list/tab-close.tsx
var import_react2 = require("@chakra-ui/react");
var import_md = require("react-icons/md");
var TabClose = /* @__PURE__ */ __name(({ onClose }) => /* @__PURE__ */ import_react.default.createElement(import_react2.Box, {
  "data-testid": "tab-close",
  display: "flex",
  onClick: (event) => {
    event.stopPropagation();
    onClose();
  },
  color: "red.500"
}, /* @__PURE__ */ import_react.default.createElement(import_react2.Icon, {
  as: import_md.MdClose,
  boxSize: 4
})), "TabClose");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TabClose
});
