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

// src/banner.tsx
var banner_exports = {};
__export(banner_exports, {
  Banner: () => Banner
});
module.exports = __toCommonJS(banner_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/banner.tsx
var import_react2 = require("@saas-ui/react");
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
var Banner = /* @__PURE__ */ __name(({ bannerProperties = {}, title, body }) => /* @__PURE__ */ import_react.default.createElement(import_react2.Banner, _extends({
  status: "info",
  mb: 5,
  variant: "subtle",
  motionPreset: "scale",
  borderRadius: "lg"
}, bannerProperties), /* @__PURE__ */ import_react.default.createElement(import_react2.BannerIcon, null), /* @__PURE__ */ import_react.default.createElement(import_react2.BannerContent, null, /* @__PURE__ */ import_react.default.createElement(import_react2.BannerTitle, {
  fontWeight: "bold"
}, title), /* @__PURE__ */ import_react.default.createElement(import_react2.BannerDescription, {
  fontWeight: "normal"
}, body))), "Banner");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Banner
});
