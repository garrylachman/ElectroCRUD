var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
  ActionsDropdownMenu: () => ActionsDropdownMenu,
  AddButton: () => AddButton,
  CancelButton: () => CancelButton,
  DeleteButton: () => DeleteButton,
  DeleteIconButton: () => DeleteIconButton,
  EditIconButton: () => EditIconButton,
  LockButton: () => LockButton,
  RippleButton: () => RippleButton,
  SaveButton: () => SaveButton
});
module.exports = __toCommonJS(src_exports);

// src/save-button.tsx
var import_react2 = require("@chakra-ui/react");
var import_md = require("react-icons/md");

// src/ripple-button.tsx
var import_react = require("@chakra-ui/react");
var import_chroma_js = __toESM(require("chroma-js"));
var import_framer_motion = require("framer-motion");
var import_jsx_runtime = require("react/jsx-runtime");
var pulse = (0, import_react.keyframes)({
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
var RippleButton = ({
  children,
  size = "md",
  bgColorScheme = "primary",
  bgColor = {
    step1: `${bgColorScheme}.400`,
    step2: `${bgColorScheme}.600`,
    step3: `${bgColorScheme}.700`
  },
  ...properties
}) => {
  const [step1, step2, step3] = (0, import_react.useToken)("colors", [
    // @ts-ignore
    bgColor.step1,
    // @ts-ignore
    bgColor.step2,
    // @ts-ignore
    bgColor.step3
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react.Button,
    {
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
      },
      ...properties,
      children
    }
  );
};

// src/save-button.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var SaveButton = (properties) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
  RippleButton,
  {
    variant: "solid",
    bgColorScheme: "primary",
    size: "lg",
    ...properties,
    gap: 2,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Icon, { as: import_md.MdSave, boxSize: 5 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Text, { children: "Save" })
    ]
  }
);

// src/actions-dropdown-menu.tsx
var import_react3 = require("@chakra-ui/react");
var import_underscore = require("underscore");
var import_react4 = require("react");
var import_md2 = require("react-icons/md");
var import_utils = require("@electrocrud/utils");
var import_jsx_runtime3 = require("react/jsx-runtime");
var ActionsDropdownMenu = ({
  menuName = "Actions",
  items = []
}) => {
  const cachedItems = (0, import_react4.useMemo)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.Box, { position: "relative", right: 0, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.Menu, { offset: [0, 0], strategy: "fixed", placement: "bottom-end", children: ({ isOpen }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react3.Box, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_react3.MenuButton,
      {
        isActive: isOpen,
        borderBottomRightRadius: isOpen ? 0 : 10,
        borderBottomLeftRadius: isOpen ? 0 : 10,
        as: import_react3.Button,
        variant: "solid",
        colorScheme: "primary",
        rightIcon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.Icon, { as: import_md2.MdArrowDropDown, fontSize: "2xl" }),
        children: menuName
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_react3.MenuList,
      {
        rounded: "lg",
        boxShadow: "lg",
        py: 0,
        overflow: "hidden",
        borderTopRightRadius: 0,
        children: cachedItems.map(
          (item) => item.isDivider ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            import_react3.Box,
            {
              textAlign: "center",
              height: "12px",
              width: "90%",
              m: "auto",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.MenuDivider, { borderColor: "gray.300" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  import_react3.Text,
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
          ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            import_react3.MenuItem,
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

// src/delete-icon-button.tsx
var import_react5 = require("@chakra-ui/react");
var import_hi = require("react-icons/hi");
var import_jsx_runtime4 = require("react/jsx-runtime");
var DeleteIconButton = (properties) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
  RippleButton,
  {
    size: "sm",
    ...properties,
    bgColor: { step1: "red.400", step2: "red.600", step3: "red.800" },
    p: 2,
    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react5.Icon, { as: import_hi.HiOutlineTrash, boxSize: 4 })
  }
);

// src/edit-icon-button.tsx
var import_react6 = require("@chakra-ui/react");
var import_md3 = require("react-icons/md");
var import_jsx_runtime5 = require("react/jsx-runtime");
var EditIconButton = (properties) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(RippleButton, { size: "sm", ...properties, bgColorScheme: "primary", p: 2, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react6.Icon, { as: import_md3.MdEdit, boxSize: 4 }) });

// src/cancel-button.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var CancelButton = (properties) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(RippleButton, { variant: "solid", bgColorScheme: "red", size: "lg", ...properties, children: "Cancel" });

// src/add-button.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var AddButton = (properties) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  RippleButton,
  {
    variant: "solid",
    bgColorScheme: "primary",
    size: "lg",
    ...properties,
    children: "Add New"
  }
);

// src/delete-button.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var DeleteButton = (properties) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(RippleButton, { variant: "solid", bgColorScheme: "red", size: "lg", ...properties, children: "Delete" });

// src/lock-button.tsx
var import_react7 = require("@chakra-ui/react");
var import_bs = require("react-icons/bs");
var import_jsx_runtime9 = require("react/jsx-runtime");
var LockButton = ({ onClick }) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react7.Button, { onClick, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react7.Icon, { as: import_bs.BsShieldLockFill, boxSize: 18 }) });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionsDropdownMenu,
  AddButton,
  CancelButton,
  DeleteButton,
  DeleteIconButton,
  EditIconButton,
  LockButton,
  RippleButton,
  SaveButton
});
