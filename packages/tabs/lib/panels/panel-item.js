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

// src/panels/panel-item.tsx
var panel_item_exports = {};
__export(panel_item_exports, {
  PanelItem: () => PanelItem
});
module.exports = __toCommonJS(panel_item_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/panels/panel-item.tsx
var import_framer_motion = require("framer-motion");
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
var PanelItem = /* @__PURE__ */ __name(({ tab, tabIndex, isBoxed, variant, marginTop, marginBottom, tabPanelProps, fillAvailable, hasScrollbar }) => /* @__PURE__ */ import_react.default.createElement(import_react2.TabPanel, _extends({
  tabIndex,
  p: 0,
  borderWidth: isBoxed ? "1px" : 0,
  borderTopWidth: isBoxed && variant !== void 0 ? "1px" : "0px",
  overflowX: "hidden",
  height: "100%",
  width: "auto",
  position: "initial",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  marginTop,
  marginBottom
}, tabPanelProps), /* @__PURE__ */ import_react.default.createElement(import_framer_motion.motion.div, {
  key: tabIndex ? tab.name : "empty",
  animate: {
    opacity: 1,
    x: 0,
    filter: "none"
  },
  initial: {
    opacity: 0.2,
    x: 200,
    filter: `blur(5px)`
  },
  exit: {
    opacity: 0.2,
    x: -200
  },
  transition: {
    duration: 1,
    bounce: 0.3,
    type: "spring",
    stiffness: 150,
    damping: 15
  },
  style: {
    height: fillAvailable ? "-webkit-fill-available" : "100%",
    display: "flex",
    flexDirection: "column",
    width: "-webkit-fill-available",
    overflow: "scroll",
    overscrollBehavior: "contain",
    position: fillAvailable ? "absolute" : "static"
  },
  className: hasScrollbar ? "tabScroller" : "NoTabScroller"
}, tab.element ?? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null))), "PanelItem");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PanelItem
});
