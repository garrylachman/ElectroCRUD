/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 117);
/******/ })
/************************************************************************/
/******/ ({

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* global chrome */



const ports = {};

if (!_utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "a"]) {
  // Manifest V3 method of injecting content scripts (not yet supported in Firefox)
  // Note: the "world" option in registerContentScripts is only available in Chrome v102+
  // It's critical since it allows us to directly run scripts on the "main" world on the page
  // "document_start" allows it to run before the page's scripts
  // so the hook can be detected by react reconciler
  chrome.scripting.registerContentScripts([{
    id: 'hook',
    matches: ['<all_urls>'],
    js: ['build/installHook.js'],
    runAt: 'document_start',
    world: chrome.scripting.ExecutionWorld.MAIN
  }, {
    id: 'renderer',
    matches: ['<all_urls>'],
    js: ['build/renderer.js'],
    runAt: 'document_start',
    world: chrome.scripting.ExecutionWorld.MAIN
  }]);
}

chrome.runtime.onConnect.addListener(function (port) {
  let tab = null;
  let name = null;

  if (isNumeric(port.name)) {
    tab = port.name;
    name = 'devtools';
    installProxy(+port.name);
  } else {
    tab = port.sender.tab.id;
    name = 'content-script';
  }

  if (!ports[tab]) {
    ports[tab] = {
      devtools: null,
      'content-script': null
    };
  }

  ports[tab][name] = port;

  if (ports[tab].devtools && ports[tab]['content-script']) {
    doublePipe(ports[tab].devtools, ports[tab]['content-script']);
  }
});

function isNumeric(str) {
  return +str + '' === str;
}

function installProxy(tabId) {
  if (_utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "a"]) {
    chrome.tabs.executeScript(tabId, {
      file: '/build/proxy.js'
    }, function () {});
  } else {
    chrome.scripting.executeScript({
      target: {
        tabId: tabId
      },
      files: ['/build/proxy.js']
    });
  }
}

function doublePipe(one, two) {
  one.onMessage.addListener(lOne);

  function lOne(message) {
    two.postMessage(message);
  }

  two.onMessage.addListener(lTwo);

  function lTwo(message) {
    one.postMessage(message);
  }

  function shutdown() {
    one.onMessage.removeListener(lOne);
    two.onMessage.removeListener(lTwo);
    one.disconnect();
    two.disconnect();
  }

  one.onDisconnect.addListener(shutdown);
  two.onDisconnect.addListener(shutdown);
}

function setIconAndPopup(reactBuildType, tabId) {
  const action = _utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "a"] ? chrome.browserAction : chrome.action;
  action.setIcon({
    tabId: tabId,
    path: {
      '16': chrome.runtime.getURL(`icons/16-${reactBuildType}.png`),
      '32': chrome.runtime.getURL(`icons/32-${reactBuildType}.png`),
      '48': chrome.runtime.getURL(`icons/48-${reactBuildType}.png`),
      '128': chrome.runtime.getURL(`icons/128-${reactBuildType}.png`)
    }
  });
  action.setPopup({
    tabId: tabId,
    popup: chrome.runtime.getURL(`popups/${reactBuildType}.html`)
  });
}

function isRestrictedBrowserPage(url) {
  return !url || new URL(url).protocol === 'chrome:';
}

function checkAndHandleRestrictedPageIfSo(tab) {
  if (tab && isRestrictedBrowserPage(tab.url)) {
    setIconAndPopup('restricted', tab.id);
  }
} // update popup page of any existing open tabs, if they are restricted browser pages.
// we can't update for any other types (prod,dev,outdated etc)
// as the content script needs to be injected at document_start itself for those kinds of detection
// TODO: Show a different popup page(to reload current page probably) for old tabs, opened before the extension is installed


if (!_utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "a"]) {
  chrome.tabs.query({}, tabs => tabs.forEach(checkAndHandleRestrictedPageIfSo));
  chrome.tabs.onCreated.addListener((tabId, changeInfo, tab) => checkAndHandleRestrictedPageIfSo(tab));
} // Listen to URL changes on the active tab and update the DevTools icon.


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (_utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "a"]) {
    // We don't properly detect protected URLs in Firefox at the moment.
    // However we can reset the DevTools icon to its loading state when the URL changes.
    // It will be updated to the correct icon by the onMessage callback below.
    if (tab.active && changeInfo.status === 'loading') {
      setIconAndPopup('disabled', tabId);
    }
  } else {
    // Don't reset the icon to the loading state for Chrome or Edge.
    // The onUpdated callback fires more frequently for these browsers,
    // often after onMessage has been called.
    checkAndHandleRestrictedPageIfSo(tab);
  }
});
chrome.runtime.onMessage.addListener((request, sender) => {
  var _request$payload, _ports$id;

  const tab = sender.tab;

  if (tab) {
    const id = tab.id; // This is sent from the hook content script.
    // It tells us a renderer has attached.

    if (request.hasDetectedReact) {
      setIconAndPopup(request.reactBuildType, id);
    } else {
      switch ((_request$payload = request.payload) === null || _request$payload === void 0 ? void 0 : _request$payload.type) {
        case 'fetch-file-with-cache-complete':
        case 'fetch-file-with-cache-error':
          // Forward the result of fetch-in-page requests back to the extension.
          const devtools = (_ports$id = ports[id]) === null || _ports$id === void 0 ? void 0 : _ports$id.devtools;

          if (devtools) {
            devtools.postMessage(request);
          }

          break;
      }
    }
  }
});

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_EDGE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IS_FIREFOX; });
/* unused harmony export IS_CHROME */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getBrowserName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getBrowserTheme; });
/* global chrome */
const IS_EDGE = navigator.userAgent.indexOf('Edg') >= 0;
const IS_FIREFOX = navigator.userAgent.indexOf('Firefox') >= 0;
const IS_CHROME = IS_EDGE === false && IS_FIREFOX === false;
function getBrowserName() {
  if (IS_EDGE) {
    return 'Edge';
  }

  if (IS_FIREFOX) {
    return 'Firefox';
  }

  if (IS_CHROME) {
    return 'Chrome';
  }

  throw new Error('Expected browser name to be one of Chrome, Edge or Firefox.');
}
function getBrowserTheme() {
  if (IS_CHROME) {
    // chrome.devtools.panels added in Chrome 18.
    // chrome.devtools.panels.themeName added in Chrome 54.
    return chrome.devtools.panels.themeName === 'dark' ? 'dark' : 'light';
  } else {
    // chrome.devtools.panels.themeName added in Firefox 55.
    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.panels/themeName
    if (chrome.devtools && chrome.devtools.panels) {
      switch (chrome.devtools.panels.themeName) {
        case 'dark':
          return 'dark';

        default:
          return 'light';
      }
    }
  }
}

/***/ })

/******/ });