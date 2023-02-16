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

// src/layout-content/layout-card-content.tsx
var layout_card_content_exports = {};
__export(layout_card_content_exports, {
  LayoutCardContent: () => LayoutCardContent
});
module.exports = __toCommonJS(layout_card_content_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/layout-content/layout-card-content.tsx
var import_react2 = require("@chakra-ui/react");
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
var LayoutCardContent = /* @__PURE__ */ __name(({ children, cardProperties = {}, cardBodyProperties = {} }) => /* @__PURE__ */ import_react.default.createElement(import_react2.Flex, {
  height: "100%",
  pr: 2
}, /* @__PURE__ */ import_react.default.createElement(import_react2.Card, _extends({
  height: "initial",
  variant: "elevated",
  overflow: "revert"
}, cardProperties), /* @__PURE__ */ import_react.default.createElement(import_react2.CardBody, _extends({
  bg: "inherit"
}, cardBodyProperties), children))), "LayoutCardContent");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LayoutCardContent
});
