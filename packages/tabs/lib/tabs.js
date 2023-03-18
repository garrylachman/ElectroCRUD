var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// react-import.ts
var import_react;
var init_react_import = __esm({
  "react-import.ts"() {
    import_react = __toESM(require("react"));
  }
});

// ../../node_modules/arc-is/index.js
var nativeTable, arc_is_default;
var init_arc_is = __esm({
  "../../node_modules/arc-is/index.js"() {
    init_react_import();
    nativeTable = {
      "[object Array]": "Array",
      "[object ArrayBuffer]": "ArrayBuffer",
      "[object Boolean]": "Boolean",
      "[object DataView]": "DataView",
      "[object Date]": "Date",
      "[object Error]": "Error",
      "[object EvalError]": "EvalError",
      "[object Float32Array]": "Float32Array",
      "[object Float64Array]": "Float64Array",
      "[object Function]": "Function",
      "[object AsyncFunction]": "AsyncFunction",
      "[object Int8Array]": "Int8Array",
      "[object Int16Array]": "Int16Array",
      "[object Int32Array]": "Int32Array",
      "[object Map]": "Map",
      "[object Number]": "Number",
      "[object Object]": "Object",
      "[object Proxy]": "Proxy",
      "[object Promise]": "Promise",
      "[object RangeError]": "RangeError",
      "[object ReferenceError]": "ReferenceError",
      "[object RegExp]": "RegExp",
      "[object Set]": "Set",
      "[object String]": "String",
      "[object Symbol]": "Symbol",
      "[object SyntaxError]": "SyntaxError",
      "[object TypeError]": "TypeError",
      "[object Uint8Array]": "Uint8Array",
      "[object Uint8ClampedArray]": "Uint8ClampedArray",
      "[object Uint16Array]": "Uint16Array",
      "[object Uint32Array]": "Uint32Array",
      "[object URIError]": "URIError",
      "[object WeakMap]": "WeakMap",
      "[object WeakSet]": "WeakSet"
    };
    arc_is_default = /* @__PURE__ */ __name((_val, _objType) => {
      let $return, toString;
      if (_val === void 0) {
        return _objType ? "Undefined" : "undefined";
      }
      if (_val === null) {
        return _objType ? "Null" : "null";
      }
      $return = nativeTable[Object.prototype.toString.call(_val)];
      if ($return === "Number") {
        if (isNaN(_val)) {
          return !_objType ? "nan" : "NaN";
        }
        if (!isFinite(_val)) {
          return !_objType ? "infinity" : "Infinity";
        }
      }
      if (!_objType && $return) {
        return $return.toLowerCase() || "object";
      }
      if (_val.toString) {
        toString = _val.toString().match(/\[object ([^\]]*)\]/);
      }
      if (!toString) {
        toString = Object.prototype.toString.call(_val).match(/\[object ([^\]]*)\]/);
      }
      if (!toString) {
        return $return;
      }
      return !_objType ? toString[1].toLowerCase() : toString[1];
    }, "default");
  }
});

// ../../node_modules/arc-hash/index.js
var arc_hash_exports = {};
__export(arc_hash_exports, {
  default: () => arc_hash_default
});
var import_crypto, ArcHash, arc_hash_default;
var init_arc_hash = __esm({
  "../../node_modules/arc-hash/index.js"() {
    init_react_import();
    import_crypto = __toESM(require("crypto"), 1);
    init_arc_is();
    ArcHash = /* @__PURE__ */ __name(class ArcHash2 {
      static md5(_unknown, _secret = "") {
        switch (arc_is_default(_unknown)) {
          case "object":
            return ArcHash2.object(_unknown, "md5", _secret);
          case "array":
            return ArcHash2.array(_unknown, "md5", _secret);
          default:
            const hmac = _secret ? import_crypto.default.createHmac("md5", _secret) : import_crypto.default.createHash("md5");
            hmac.update(_unknown);
            return hmac.digest("hex");
        }
      }
      static sha256(_unknown, _secret = "") {
        switch (arc_is_default(_unknown)) {
          case "object":
            return ArcHash2.object(_unknown, "sha256", _secret);
          case "array":
            return ArcHash2.array(_unknown, "sha256", _secret);
          default:
            const hmac = _secret ? import_crypto.default.createHmac("sha256", _secret) : import_crypto.default.createHash("sha256");
            hmac.update(_unknown);
            return hmac.digest("hex");
        }
      }
      static object(_object, _algorithm, _secret = "") {
        const joinedStr = Object.keys(_object).sort().reduce((_join, _key) => {
          switch (arc_is_default(_object[_key])) {
            case "object":
              return _join + _key + ArcHash2.object(_object[_key], _algorithm, _secret);
            case "array":
              return _join + _key + ArcHash2.array(_object[_key], _algorithm, _secret);
            default:
              return _join + _key + String(_object[_key]);
          }
        }, "");
        return _algorithm === "sha256" ? ArcHash2.sha256(joinedStr, _secret) : ArcHash2.md5(joinedStr, _secret);
      }
      static array(_array, _algorithm, _secret = "") {
        const joinedStr = _array.reduce((_join, _val) => {
          switch (arc_is_default(_val)) {
            case "object":
              return _join + ArcHash2.object(_val, _algorithm, _secret);
            case "array":
              return _join + ArcHash2.array(_val, _algorithm, _secret);
            default:
              return _join + String(_val);
          }
        }, "");
        return _algorithm === "sha256" ? ArcHash2.sha256(joinedStr, _secret) : ArcHash2.md5(joinedStr, _secret);
      }
    }, "ArcHash");
    arc_hash_default = ArcHash;
  }
});

// ../../node_modules/flatted/cjs/index.js
var require_cjs = __commonJS({
  "../../node_modules/flatted/cjs/index.js"(exports) {
    "use strict";
    init_react_import();
    var { parse: $parse, stringify: $stringify } = JSON;
    var { keys } = Object;
    var Primitive = String;
    var primitive = "string";
    var ignore = {};
    var object = "object";
    var noop = /* @__PURE__ */ __name((_, value) => value, "noop");
    var primitives = /* @__PURE__ */ __name((value) => value instanceof Primitive ? Primitive(value) : value, "primitives");
    var Primitives = /* @__PURE__ */ __name((_, value) => typeof value === primitive ? new Primitive(value) : value, "Primitives");
    var revive = /* @__PURE__ */ __name((input, parsed, output, $) => {
      const lazy = [];
      for (let ke = keys(output), { length } = ke, y = 0; y < length; y++) {
        const k = ke[y];
        const value = output[k];
        if (value instanceof Primitive) {
          const tmp = input[value];
          if (typeof tmp === object && !parsed.has(tmp)) {
            parsed.add(tmp);
            output[k] = ignore;
            lazy.push({
              k,
              a: [
                input,
                parsed,
                tmp,
                $
              ]
            });
          } else
            output[k] = $.call(output, k, tmp);
        } else if (output[k] !== ignore)
          output[k] = $.call(output, k, value);
      }
      for (let { length } = lazy, i = 0; i < length; i++) {
        const { k, a } = lazy[i];
        output[k] = $.call(output, k, revive.apply(null, a));
      }
      return output;
    }, "revive");
    var set = /* @__PURE__ */ __name((known, input, value) => {
      const index = Primitive(input.push(value) - 1);
      known.set(value, index);
      return index;
    }, "set");
    var parse = /* @__PURE__ */ __name((text, reviver) => {
      const input = $parse(text, Primitives).map(primitives);
      const value = input[0];
      const $ = reviver || noop;
      const tmp = typeof value === object && value ? revive(input, /* @__PURE__ */ new Set(), value, $) : value;
      return $.call({
        "": tmp
      }, "", tmp);
    }, "parse");
    exports.parse = parse;
    var stringify = /* @__PURE__ */ __name((value, replacer, space) => {
      const $ = replacer && typeof replacer === object ? (k, v) => k === "" || -1 < replacer.indexOf(k) ? v : void 0 : replacer || noop;
      const known = /* @__PURE__ */ new Map();
      const input = [];
      const output = [];
      let i = +set(known, input, $.call({
        "": value
      }, "", value));
      let firstRun = !i;
      while (i < input.length) {
        firstRun = true;
        output[i] = $stringify(input[i++], replace, space);
      }
      return "[" + output.join(",") + "]";
      function replace(key, value2) {
        if (firstRun) {
          firstRun = !firstRun;
          return value2;
        }
        const after = $.call(this, key, value2);
        switch (typeof after) {
          case object:
            if (after === null)
              return after;
          case primitive:
            return known.get(after) || set(known, input, after);
        }
        return after;
      }
      __name(replace, "replace");
    }, "stringify");
    exports.stringify = stringify;
    var toJSON = /* @__PURE__ */ __name((any) => $parse(stringify(any)), "toJSON");
    exports.toJSON = toJSON;
    var fromJSON = /* @__PURE__ */ __name((any) => parse($stringify(any)), "fromJSON");
    exports.fromJSON = fromJSON;
  }
});

// ../utils/lib/index.js
var require_lib = __commonJS({
  "../utils/lib/index.js"(exports, module2) {
    init_react_import();
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, {
          get: all[name],
          enumerable: true
        });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, {
              get: () => from[key],
              enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable
            });
      }
      return to;
    }, "__copyProps");
    var __toESM2 = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", {
        value: mod,
        enumerable: true
      }) : target,
      mod
    )), "__toESM");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", {
      value: true
    }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      ObjectID: () => ObjectID2
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_arc_hash = __toESM2((init_arc_hash(), __toCommonJS(arc_hash_exports)));
    var import_flatted = require_cjs();
    var ObjectID2 = /* @__PURE__ */ __name(class {
      static id(input) {
        return import_arc_hash.default.md5((0, import_flatted.stringify)(input));
      }
    }, "ObjectID");
  }
});

// src/tabs.tsx
var tabs_exports = {};
__export(tabs_exports, {
  Tabs: () => Tabs
});
module.exports = __toCommonJS(tabs_exports);
init_react_import();
var import_react5 = require("@chakra-ui/react");
var import_framer_motion3 = require("framer-motion");
var import_react6 = require("react");
var import_utils = __toESM(require_lib());
var import_underscore = require("underscore");

// src/list/index.tsx
init_react_import();

// src/list/tab-item.tsx
init_react_import();
var import_framer_motion = require("framer-motion");
var import_react3 = require("@chakra-ui/react");

// ../feedback/lib/index.js
init_react_import();

// src/list/tab-close.tsx
init_react_import();
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

// src/panels/index.tsx
init_react_import();

// src/panels/panel-item.tsx
init_react_import();
var import_framer_motion2 = require("framer-motion");
var import_react4 = require("@chakra-ui/react");
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
var PanelItem = /* @__PURE__ */ __name(({ tab, tabIndex, isBoxed, variant, marginTop, marginBottom, tabPanelProps, fillAvailable, hasScrollbar }) => /* @__PURE__ */ import_react.default.createElement(import_react4.TabPanel, _extends({
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
}, tabPanelProps), /* @__PURE__ */ import_react.default.createElement(import_framer_motion2.motion.div, {
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

// src/tabs.tsx
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
var Tabs = /* @__PURE__ */ (0, import_react6.forwardRef)(({ tabsList, iconSize = 4, iconGap = 3, isFitted = true, isBoxed = false, fontSize = "lg", fillAvailable = false, hasScrollbar = false, variant, marginTop = 0, marginBottom = 0, tabPanelProps, isSticky = false, height = "100%", ...rest }, reference) => {
  const [tabsState, setTabsState] = (0, import_react6.useState)(tabsList);
  const [selectedTab, setSelectedTab] = (0, import_react6.useState)(tabsState[0]);
  const tabIndex = (0, import_react6.useMemo)(() => tabsState.indexOf(selectedTab), [
    tabsState,
    selectedTab
  ]);
  const tabListSticky = (0, import_react6.useMemo)(() => {
    if (isSticky) {
      return {
        position: "sticky",
        top: "0px",
        zIndex: 99,
        background: "white",
        borderTopRadius: "lg",
        marginTop: "-12px"
      };
    }
    return {};
  }, [
    isSticky
  ]);
  (0, import_react6.useImperativeHandle)(reference, () => {
    return {
      addTab: (tab) => {
        setTabsState((previous) => [
          ...previous,
          tab
        ]);
        setSelectedTab(tab);
      }
    };
  }, [
    setTabsState,
    tabsState
  ]);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_react5.Tabs, _extends2({
    as: import_react5.Flex,
    isFitted,
    isLazy: true,
    lazyBehavior: "unmount",
    variant
  }, rest, {
    index: tabIndex,
    onChange: (value) => setSelectedTab(tabsState[value]),
    overflow: "unset",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height,
    position: "relative"
  }), /* @__PURE__ */ import_react.default.createElement(import_react5.TabList, _extends2({}, tabListSticky), /* @__PURE__ */ import_react.default.createElement(import_framer_motion3.Reorder.Group, {
    as: "ul",
    axis: "x",
    onReorder: setTabsState,
    className: "tabs",
    values: tabsState,
    style: {
      display: "flex",
      listStyle: "none",
      flex: 1
    }
  }, /* @__PURE__ */ import_react.default.createElement(import_framer_motion3.AnimatePresence, {
    initial: false
  }, tabsState.map((tab) => /* @__PURE__ */ import_react.default.createElement(TabItem, {
    key: import_utils.ObjectID.id((0, import_underscore.omit)(tab, [
      "element",
      "component",
      "icon"
    ])),
    tab,
    isSelected: tab === selectedTab,
    isFitted,
    iconGap,
    fontSize,
    onSelected: () => {
      setSelectedTab(tab);
    },
    onClose: () => {
      setSelectedTab(tabsState[tabsState.length - 2]);
      setTabsState((previous) => previous.filter((value) => value !== tab));
    }
  }))))), /* @__PURE__ */ import_react.default.createElement(import_react5.TabPanels, {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100%"
  }, tabsState.map((tab, index) => /* @__PURE__ */ import_react.default.createElement(PanelItem, {
    key: import_utils.ObjectID.id((0, import_underscore.omit)(tab, [
      "name",
      "element",
      "component",
      "icon"
    ])),
    tab,
    tabIndex: index,
    isBoxed,
    marginTop,
    tabPanelProps,
    fillAvailable,
    hasScrollbar,
    variant
  })))));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tabs
});
/*! Bundled license information:

flatted/cjs/index.js:
  (*! (c) 2020 Andrea Giammarchi *)
*/
