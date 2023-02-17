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

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Alert: () => Alert,
  Banner: () => Banner,
  Tooltip: () => Tooltip
});
module.exports = __toCommonJS(src_exports);

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

// src/tooltip.tsx
var import_react3 = require("@chakra-ui/react");
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
var Tooltip = /* @__PURE__ */ __name(({ children, ...rest }) => /* @__PURE__ */ import_react.default.createElement(import_react3.Tooltip, _extends({
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

// src/banner.tsx
var import_react4 = require("@saas-ui/react");
function _extends2() {
  _extends2 = Object.assign || function(target) {
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
  return _extends2.apply(this, arguments);
}
__name(_extends2, "_extends");
var Banner = /* @__PURE__ */ __name(({ bannerProperties = {}, title, body }) => /* @__PURE__ */ import_react.default.createElement(import_react4.Banner, _extends2({
  status: "info",
  mb: 5,
  variant: "subtle",
  motionPreset: "scale",
  borderRadius: "lg"
}, bannerProperties), /* @__PURE__ */ import_react.default.createElement(import_react4.BannerIcon, null), /* @__PURE__ */ import_react.default.createElement(import_react4.BannerContent, null, /* @__PURE__ */ import_react.default.createElement(import_react4.BannerTitle, {
  fontWeight: "bold"
}, title), /* @__PURE__ */ import_react.default.createElement(import_react4.BannerDescription, {
  fontWeight: "normal"
}, body))), "Banner");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Alert,
  Banner,
  Tooltip
});
