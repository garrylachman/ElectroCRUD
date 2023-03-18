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

// src/list/tab-item.tsx
var tab_item_exports = {};
__export(tab_item_exports, {
  TabItem: () => TabItem
});
module.exports = __toCommonJS(tab_item_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/list/tab-item.tsx
var import_framer_motion = require("framer-motion");
var import_react3 = require("@chakra-ui/react");

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

// src/list/tab-item.tsx
var TabItem = /* @__PURE__ */ __name(({ tab, isFitted, iconGap, isSelected, onSelected, onClose, fontSize }) => /* @__PURE__ */ import_react.default.createElement(import_framer_motion.Reorder.Item, {
  value: tab,
  initial: {
    opacity: 0,
    y: 30
  },
  style: {
    width: isFitted ? "100%" : "auto"
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.5
    }
  },
  whileDrag: {
    backgroundColor: "#e3e3e3"
  }
}, /* @__PURE__ */ import_react.default.createElement(import_react3.Tab, {
  isSelected,
  width: isFitted ? "100%" : "auto",
  minWidth: "150px"
}, /* @__PURE__ */ import_react.default.createElement(import_framer_motion.motion.span, {
  layout: "position"
}, /* @__PURE__ */ import_react.default.createElement(void 0, {
  label: "Drag to change tabs order",
  openDelay: 500
}, /* @__PURE__ */ import_react.default.createElement(import_react3.Center, {
  gap: iconGap,
  justifyContent: "space-between"
}, /* @__PURE__ */ import_react.default.createElement(import_react3.Flex, {
  gap: 2,
  alignItems: "center",
  onPointerDown: onSelected
}, /* @__PURE__ */ import_react.default.createElement(import_react3.Icon, {
  as: tab.icon,
  boxSize: 4
}), /* @__PURE__ */ import_react.default.createElement(import_react3.Text, {
  fontSize,
  fontWeight: "500"
}, tab.name)), tab?.closeable && /* @__PURE__ */ import_react.default.createElement(TabClose, {
  onClose
})))))), "TabItem");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TabItem
});
