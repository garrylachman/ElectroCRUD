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

// src/actions-dropdown-menu.tsx
var actions_dropdown_menu_exports = {};
__export(actions_dropdown_menu_exports, {
  ActionsDropdownMenu: () => ActionsDropdownMenu
});
module.exports = __toCommonJS(actions_dropdown_menu_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/actions-dropdown-menu.tsx
var import_react2 = require("@chakra-ui/react");
var import_underscore = require("underscore");
var import_react3 = require("react");
var import_md = require("react-icons/md");
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
var ActionsDropdownMenu = /* @__PURE__ */ __name(({ menuName = "Actions", items = [] }) => {
  const cachedItems = (0, import_react3.useMemo)(() => items.map((item, itemIndex) => {
    return {
      ...item,
      key: (0, import_underscore.uniqueId)("Actions-Menu-Item-")
    };
  }), [
    items
  ]);
  return /* @__PURE__ */ import_react.default.createElement(import_react2.Box, {
    position: "relative",
    right: 0
  }, /* @__PURE__ */ import_react.default.createElement(import_react2.Menu, {
    offset: [
      0,
      0
    ],
    strategy: "fixed",
    placement: "bottom-end",
    isLazy: true
  }, ({ isOpen }) => /* @__PURE__ */ import_react.default.createElement(import_react2.Box, null, /* @__PURE__ */ import_react.default.createElement(import_react2.MenuButton, {
    isActive: isOpen,
    borderBottomRightRadius: isOpen ? 0 : 10,
    borderBottomLeftRadius: isOpen ? 0 : 10,
    as: import_react2.Button,
    variant: "solid",
    colorScheme: "primary",
    rightIcon: /* @__PURE__ */ import_react.default.createElement(import_react2.Icon, {
      as: import_md.MdArrowDropDown,
      fontSize: "2xl"
    })
  }, menuName), /* @__PURE__ */ import_react.default.createElement(import_react2.MenuList, {
    rounded: "lg",
    boxShadow: "lg",
    py: 0,
    overflow: "hidden",
    borderTopRightRadius: 0
  }, cachedItems.map((item) => item.isDivider ? /* @__PURE__ */ import_react.default.createElement(import_react2.Box, {
    textAlign: "center",
    height: "12px",
    key: item.key,
    width: "90%",
    m: "auto"
  }, /* @__PURE__ */ import_react.default.createElement(import_react2.MenuDivider, {
    borderColor: "gray.300"
  }), /* @__PURE__ */ import_react.default.createElement(import_react2.Text, {
    as: "span",
    position: "relative",
    top: "-25px",
    bgColor: "white",
    px: 5,
    fontSize: "xs",
    fontWeight: "medium"
  }, item.text)) : /* @__PURE__ */ import_react.default.createElement(import_react2.MenuItem, _extends({
    key: item.key
  }, item.props, {
    py: 3,
    alignItems: "center",
    fontSize: "sm",
    textTransform: "uppercase",
    gap: 3,
    iconSpacing: 0,
    _hover: {
      fontWeight: "bold",
      bgColor: "blackAlpha.200"
    }
  }), item.text))))));
}, "ActionsDropdownMenu");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionsDropdownMenu
});
