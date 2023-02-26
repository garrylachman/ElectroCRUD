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

// src/use-pane-hook.tsx
var use_pane_hook_exports = {};
__export(use_pane_hook_exports, {
  usePaneHook: () => usePaneHook
});
module.exports = __toCommonJS(use_pane_hook_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/use-pane-hook.tsx
var import_react3 = require("react");

// src/pane-context.tsx
var import_react2 = require("react");
var initial = {
  leftPaneProperties: {},
  rightPaneProperties: {},
  togglePane: () => {
  },
  options: {
    toggleButton: true,
    isDraggble: false,
    isOpen: true,
    leftPaneCloseSize: 0,
    leftPaneOpenSize: 0
  },
  isOpen: true,
  setLeftPaneProperties: () => {
    throw new Error("Function not implemented.");
  },
  setRightPaneProperties: () => {
    throw new Error("Function not implemented.");
  }
};
var PaneContext = /* @__PURE__ */ (0, import_react2.createContext)(initial);

// src/use-pane-hook.tsx
var usePaneHook = /* @__PURE__ */ __name((leftProperties, rightProperties) => {
  const paneContext = (0, import_react3.useContext)(PaneContext);
  (0, import_react3.useEffect)(() => paneContext.setLeftPaneProperties((previous) => ({
    ...previous,
    ...leftProperties
  })), []);
  (0, import_react3.useEffect)(() => paneContext.setRightPaneProperties((previous) => ({
    ...previous,
    ...rightProperties
  })), []);
  return {
    togglePane: paneContext.togglePane,
    setLeftPaneProperties: paneContext.setLeftPaneProperties,
    setRightPaneProperties: paneContext.setRightPaneProperties
  };
}, "usePaneHook");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usePaneHook
});
