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
  ActionButton: () => ActionButton,
  ActionButtonType: () => ActionButtonType,
  ActionButtonsFactory: () => ActionButtonsFactory,
  ActionsDropdownMenu: () => ActionsDropdownMenu,
  AddButton: () => AddButton,
  CancelButton: () => CancelButton,
  DeleteButton: () => DeleteButton,
  DeleteIconButton: () => DeleteIconButton,
  EditIconButton: () => EditIconButton,
  LockButton: () => LockButton,
  RippleButton: () => RippleButton,
  SaveActionButton: () => SaveActionButton,
  SaveButton: () => SaveButton
});
module.exports = __toCommonJS(src_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/index.tsx
var React2 = __toESM(require("react"));

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

// src/actions-dropdown-menu.tsx
var import_react4 = require("@chakra-ui/react");
var import_underscore = require("underscore");
var import_react5 = require("react");
var import_md2 = require("react-icons/md");
var import_utils = require("@electrocrud/utils");
function _extends3() {
  _extends3 = Object.assign || function(target) {
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
  return _extends3.apply(this, arguments);
}
__name(_extends3, "_extends");
var ActionsDropdownMenu = /* @__PURE__ */ __name(({ menuName = "Actions", items = [] }) => {
  const cachedItems = (0, import_react5.useMemo)(() => items.map((item, itemIndex) => {
    return {
      ...item,
      key: import_utils.ObjectID.id((0, import_underscore.omit)({
        ...item,
        itemIndex
      }, [
        "props",
        "text.props",
        "text.type",
        "text._owner"
      ]))
    };
  }), [
    items
  ]);
  return /* @__PURE__ */ import_react.default.createElement(import_react4.Box, {
    position: "relative",
    right: 0
  }, /* @__PURE__ */ import_react.default.createElement(import_react4.Menu, {
    offset: [
      0,
      0
    ],
    strategy: "fixed",
    placement: "bottom-end"
  }, ({ isOpen }) => /* @__PURE__ */ import_react.default.createElement(import_react4.Box, null, /* @__PURE__ */ import_react.default.createElement(import_react4.MenuButton, {
    isActive: isOpen,
    borderBottomRightRadius: isOpen ? 0 : 10,
    borderBottomLeftRadius: isOpen ? 0 : 10,
    as: import_react4.Button,
    variant: "solid",
    colorScheme: "primary",
    rightIcon: /* @__PURE__ */ import_react.default.createElement(import_react4.Icon, {
      as: import_md2.MdArrowDropDown,
      fontSize: "2xl"
    })
  }, menuName), /* @__PURE__ */ import_react.default.createElement(import_react4.MenuList, {
    rounded: "lg",
    boxShadow: "lg",
    py: 0,
    overflow: "hidden",
    borderTopRightRadius: 0
  }, cachedItems.map((item) => item.isDivider ? /* @__PURE__ */ import_react.default.createElement(import_react4.Box, {
    textAlign: "center",
    height: "12px",
    key: item.key,
    width: "90%",
    m: "auto"
  }, /* @__PURE__ */ import_react.default.createElement(import_react4.MenuDivider, {
    borderColor: "gray.300"
  }), /* @__PURE__ */ import_react.default.createElement(import_react4.Text, {
    as: "span",
    position: "relative",
    top: "-25px",
    bgColor: "white",
    px: 5,
    fontSize: "xs",
    fontWeight: "medium"
  }, item.text)) : /* @__PURE__ */ import_react.default.createElement(import_react4.MenuItem, _extends3({
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

// src/delete-icon-button.tsx
var import_react6 = require("@chakra-ui/react");
var import_hi = require("react-icons/hi");
function _extends4() {
  _extends4 = Object.assign || function(target) {
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
  return _extends4.apply(this, arguments);
}
__name(_extends4, "_extends");
var DeleteIconButton = /* @__PURE__ */ __name((properties) => /* @__PURE__ */ import_react.default.createElement(RippleButton, _extends4({
  size: "sm"
}, properties, {
  bgColor: {
    step1: "red.400",
    step2: "red.600",
    step3: "red.800"
  },
  p: 2
}), /* @__PURE__ */ import_react.default.createElement(import_react6.Icon, {
  as: import_hi.HiOutlineTrash,
  boxSize: 4
})), "DeleteIconButton");

// src/edit-icon-button.tsx
var import_react7 = require("@chakra-ui/react");
var import_md3 = require("react-icons/md");
function _extends5() {
  _extends5 = Object.assign || function(target) {
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
  return _extends5.apply(this, arguments);
}
__name(_extends5, "_extends");
var EditIconButton = /* @__PURE__ */ __name((properties) => /* @__PURE__ */ import_react.default.createElement(RippleButton, _extends5({
  size: "sm"
}, properties, {
  bgColorScheme: "primary",
  p: 2
}), /* @__PURE__ */ import_react.default.createElement(import_react7.Icon, {
  as: import_md3.MdEdit,
  boxSize: 4
})), "EditIconButton");

// src/cancel-button.tsx
function _extends6() {
  _extends6 = Object.assign || function(target) {
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
  return _extends6.apply(this, arguments);
}
__name(_extends6, "_extends");
var CancelButton = /* @__PURE__ */ __name((properties) => /* @__PURE__ */ import_react.default.createElement(RippleButton, _extends6({
  variant: "solid",
  bgColorScheme: "red",
  size: "lg"
}, properties), "Cancel"), "CancelButton");

// src/add-button.tsx
function _extends7() {
  _extends7 = Object.assign || function(target) {
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
  return _extends7.apply(this, arguments);
}
__name(_extends7, "_extends");
var AddButton = /* @__PURE__ */ __name((properties) => /* @__PURE__ */ import_react.default.createElement(RippleButton, _extends7({
  variant: "solid",
  bgColorScheme: "primary",
  size: "lg"
}, properties), "Add New"), "AddButton");

// src/delete-button.tsx
function _extends8() {
  _extends8 = Object.assign || function(target) {
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
  return _extends8.apply(this, arguments);
}
__name(_extends8, "_extends");
var DeleteButton = /* @__PURE__ */ __name((properties) => /* @__PURE__ */ import_react.default.createElement(RippleButton, _extends8({
  variant: "solid",
  bgColorScheme: "red",
  size: "lg"
}, properties), "Delete"), "DeleteButton");

// src/lock-button.tsx
var import_react8 = require("@chakra-ui/react");
var import_bs = require("react-icons/bs");
var LockButton = /* @__PURE__ */ __name(({ onClick }) => /* @__PURE__ */ import_react.default.createElement(import_react8.Button, {
  onClick
}, /* @__PURE__ */ import_react.default.createElement(import_react8.Icon, {
  as: import_bs.BsShieldLockFill,
  boxSize: 18
})), "LockButton");

// src/action-button/action-button.tsx
var import_underscore2 = require("underscore");
function _extends9() {
  _extends9 = Object.assign || function(target) {
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
  return _extends9.apply(this, arguments);
}
__name(_extends9, "_extends");
var ActionButton = /* @__PURE__ */ __name(({ children, ...properties }) => /* @__PURE__ */ import_react.default.createElement(RippleButton, _extends9({
  variant: "solid",
  size: "md",
  bgColorScheme: properties.colorScheme || "primary"
}, (0, import_underscore2.omit)(properties, [
  "bgColor",
  "actionName"
])), children), "ActionButton");

// src/action-button/save-action-button.tsx
var import_react9 = require("@chakra-ui/react");
var import_react10 = require("react");
var import_md4 = require("react-icons/md");
var buttonProperties = {
  bgColorScheme: "primary",
  gap: 2,
  variant: "solid"
};
var ButtonContent = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_react9.Icon, {
  as: import_md4.MdSave,
  boxSize: 5
}), /* @__PURE__ */ import_react.default.createElement(import_react9.Text, null, "Save"));
var SaveActionButton = /* @__PURE__ */ __name((properties) => {
  const renderComponent = (0, import_react10.useCallback)((children) => ActionButton({
    ...properties,
    ...buttonProperties,
    children
  }), [
    properties
  ]);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, renderComponent(ButtonContent));
}, "SaveActionButton");

// src/action-button/action-factory.tsx
var import_react13 = require("react");

// src/action-button/cancel-action-button.tsx
var import_react11 = require("@chakra-ui/react");
var import_react12 = require("react");
var import_md5 = require("react-icons/md");
var buttonProperties2 = {
  bgColorScheme: "red",
  gap: 2,
  variant: "solid"
};
var ButtonContent2 = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_react11.Icon, {
  as: import_md5.MdCancel,
  boxSize: 5
}), /* @__PURE__ */ import_react.default.createElement(import_react11.Text, null, "Cancel"));
var CancelActionButton = /* @__PURE__ */ __name((properties) => {
  const renderComponent = (0, import_react12.useCallback)((children) => ActionButton({
    ...properties,
    ...buttonProperties2,
    children
  }), [
    properties
  ]);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, renderComponent(ButtonContent2));
}, "CancelActionButton");

// src/action-button/action-factory.tsx
function _extends10() {
  _extends10 = Object.assign || function(target) {
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
  return _extends10.apply(this, arguments);
}
__name(_extends10, "_extends");
var ActionButtonType;
(function(ActionButtonType2) {
  ActionButtonType2["SAVE"] = "SaveActionButton";
  ActionButtonType2["CANCEL"] = "CancelActionButton";
})(ActionButtonType || (ActionButtonType = {}));
var actionButtonMapping = {
  [ActionButtonType.SAVE]: SaveActionButton,
  [ActionButtonType.CANCEL]: CancelActionButton
};
var ActionButtonsFactory = /* @__PURE__ */ __name(({ actionType, ...rest }) => {
  const TargetComponent = (0, import_react13.useMemo)(() => actionButtonMapping[actionType], [
    actionType
  ]);
  return /* @__PURE__ */ import_react.default.createElement(TargetComponent, _extends10({}, rest));
}, "ActionButtonsFactory");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionButton,
  ActionButtonType,
  ActionButtonsFactory,
  ActionsDropdownMenu,
  AddButton,
  CancelButton,
  DeleteButton,
  DeleteIconButton,
  EditIconButton,
  LockButton,
  RippleButton,
  SaveActionButton,
  SaveButton
});
