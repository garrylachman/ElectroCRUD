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

// src/helpers/object-id.ts
var object_id_exports = {};
__export(object_id_exports, {
  ObjectID: () => ObjectID
});
module.exports = __toCommonJS(object_id_exports);
var import_arc_hash = __toESM(require("arc-hash"));

// ../../node_modules/flatted/esm/index.js
var { parse: $parse, stringify: $stringify } = JSON;
var { keys } = Object;
var Primitive = String;
var primitive = "string";
var object = "object";
var noop = /* @__PURE__ */ __name((_, value) => value, "noop");
var set = /* @__PURE__ */ __name((known, input, value) => {
  const index = Primitive(input.push(value) - 1);
  known.set(value, index);
  return index;
}, "set");
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

// src/helpers/object-id.ts
var ObjectID = class {
  static id(input) {
    return import_arc_hash.default.md5(stringify(input));
  }
};
__name(ObjectID, "ObjectID");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ObjectID
});
/*! Bundled license information:

flatted/esm/index.js:
  (*! (c) 2020 Andrea Giammarchi *)
*/
