var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/actions-dropdown-menu.tsx
var actions_dropdown_menu_exports = {};
__export(actions_dropdown_menu_exports, {
  ActionsDropdownMenu: () => ActionsDropdownMenu
});
module.exports = __toCommonJS(actions_dropdown_menu_exports);
var import_react = require("@chakra-ui/react");
var import_underscore = require("underscore");
var import_react2 = require("react");
var import_md = require("react-icons/md");
var import_utils = require("@electrocrud/utils");
var import_jsx_runtime = require("react/jsx-runtime");
var ActionsDropdownMenu = ({
  menuName = "Actions",
  items = []
}) => {
  const cachedItems = (0, import_react2.useMemo)(
    () => items.map((item, itemIndex) => {
      return {
        ...item,
        key: import_utils.ObjectID.id(
          (0, import_underscore.omit)({ ...item, itemIndex }, [
            "props",
            "text.props",
            "text.type",
            "text._owner"
          ])
        )
      };
    }),
    [items]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Box, { position: "relative", right: 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Menu, { offset: [0, 0], strategy: "fixed", placement: "bottom-end", children: ({ isOpen }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Box, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react.MenuButton,
      {
        isActive: isOpen,
        borderBottomRightRadius: isOpen ? 0 : 10,
        borderBottomLeftRadius: isOpen ? 0 : 10,
        as: import_react.Button,
        variant: "solid",
        colorScheme: "primary",
        rightIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Icon, { as: import_md.MdArrowDropDown, fontSize: "2xl" }),
        children: menuName
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react.MenuList,
      {
        rounded: "lg",
        boxShadow: "lg",
        py: 0,
        overflow: "hidden",
        borderTopRightRadius: 0,
        children: cachedItems.map(
          (item) => item.isDivider ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_react.Box,
            {
              textAlign: "center",
              height: "12px",
              width: "90%",
              m: "auto",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.MenuDivider, { borderColor: "gray.300" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_react.Text,
                  {
                    as: "span",
                    position: "relative",
                    top: "-25px",
                    bgColor: "white",
                    px: 5,
                    fontSize: "xs",
                    fontWeight: "medium",
                    children: item.text
                  }
                )
              ]
            },
            item.key
          ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_react.MenuItem,
            {
              ...item.props,
              py: 3,
              alignItems: "center",
              fontSize: "sm",
              textTransform: "uppercase",
              gap: 3,
              iconSpacing: 0,
              _hover: { fontWeight: "bold", bgColor: "blackAlpha.200" },
              children: item.text
            },
            item.key
          )
        )
      }
    )
  ] }) }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionsDropdownMenu
});
