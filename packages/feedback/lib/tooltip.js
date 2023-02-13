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

// src/tooltip.tsx
var tooltip_exports = {};
__export(tooltip_exports, {
  Tooltip: () => Tooltip
});
module.exports = __toCommonJS(tooltip_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/tooltip.tsx
var import_react2 = require("@chakra-ui/react");
var import_chroma_js = __toESM(require("chroma-js"));
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
__name(_extends, "_extends");
var Tooltip = /* @__PURE__ */ __name(({ children, ...rest }) => /* @__PURE__ */ import_react.default.createElement(import_react2.Tooltip, _extends({
  hasArrow: true,
  color: "white",
  borderRadius: "xl",
  boxShadow: "lg",
  py: 2,
  px: 3
}, rest, {
  bgColor: `linear-gradient(135deg, #7434db 0%, ${(0, import_chroma_js.default)("#7434db").brighten(1).hex()} 100%)`,
  borderColor: "primary.400"
}), children), "Tooltip");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tooltip
});
