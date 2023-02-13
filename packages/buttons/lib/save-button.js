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

// src/save-button.tsx
var save_button_exports = {};
__export(save_button_exports, {
  SaveButton: () => SaveButton
});
module.exports = __toCommonJS(save_button_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/save-button.tsx
var import_react3 = require("@chakra-ui/react");
var import_md = require("react-icons/md");

// src/ripple-button.tsx
var import_react2 = require("@chakra-ui/react");
var import_chroma_js = __toESM(require("chroma-js"));
var import_framer_motion = require("framer-motion");
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
var pulse = (0, import_react2.keyframes)({
  "0%": {
    opacity: 0,
    transform: "scale(0)"
  },
  "33%": {
    opacity: 1,
    transform: "scale(5)"
  },
  "100%": {
    opacity: 0,
    transform: "scale(30)"
  }
});
var RippleButton = /* @__PURE__ */ __name(({ children, size = "md", bgColorScheme = "primary", bgColor = {
  step1: `${bgColorScheme}.400`,
  step2: `${bgColorScheme}.600`,
  step3: `${bgColorScheme}.700`
}, ...properties }) => {
  const [step1, step2, step3] = (0, import_react2.useToken)("colors", [
    // @ts-ignore
    bgColor.step1,
    // @ts-ignore
    bgColor.step2,
    // @ts-ignore
    bgColor.step3
  ]);
  return /* @__PURE__ */ import_react.default.createElement(import_react2.Button, _extends({
    variant: "solid",
    as: import_framer_motion.motion.button,
    py: 3,
    px: 4,
    color: "white",
    fontWeight: "medium",
    rounded: "lg",
    shadow: "none",
    size,
    cursor: "pointer",
    overflow: "hidden",
    backgroundPosition: "center",
    style: {
      background: `linear-gradient(60deg, ${step1} 0%, ${(0, import_chroma_js.default)(step1).brighten(0.1).hex()} 100%)`
    },
    sx: {
      "&::before": {
        content: "' '",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(255,255,255,.4)",
        borderRadius: "50%",
        width: "10px",
        height: "10px",
        margin: "auto",
        opacity: 0
      }
    },
    whileHover: {
      background: [
        `linear-gradient(60deg, ${step2} 0%, ${(0, import_chroma_js.default)(step2).brighten(0.1).hex()} 100%)`,
        `linear-gradient(60deg, ${step2} 0%, ${(0, import_chroma_js.default)(step2).brighten(1).hex()} 100%)`,
        `linear-gradient(60deg, ${(0, import_chroma_js.default)(step2).brighten(1.3).hex()} 0%, ${step2} 100%)`,
        `linear-gradient(60deg, ${(0, import_chroma_js.default)(step2).brighten(0.1).hex()} 0%, ${step2} 100%)`
      ],
      transition: {
        duration: 3,
        type: "spring",
        repeat: Number.POSITIVE_INFINITY
      }
    },
    _active: {
      // @ts-ignore
      bgColor: `${bgColor.step3}`,
      "&::before": {
        animation: `${pulse} 0.8s linear`
      }
    }
  }, properties), children);
}, "RippleButton");

// src/save-button.tsx
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
var SaveButton = /* @__PURE__ */ __name((properties) => /* @__PURE__ */ import_react.default.createElement(RippleButton, _extends2({
  variant: "solid",
  bgColorScheme: "primary",
  size: "lg"
}, properties, {
  gap: 2
}), /* @__PURE__ */ import_react.default.createElement(import_react3.Icon, {
  as: import_md.MdSave,
  boxSize: 5
}), /* @__PURE__ */ import_react.default.createElement(import_react3.Text, null, "Save")), "SaveButton");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SaveButton
});