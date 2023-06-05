(function () {
    'use strict';

    var _a;
    window.__MOTION_BRIDGE_HAS_LOADED = true;
    /**
     * Inject client script into the actual webpage
     */
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("js/client.js");
    document.documentElement.appendChild(script);
    (_a = script.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(script);
    /**
     * Connect and track port to the background script
     */
    let backgroundPort;
    function bindPortListeners(port) {
        backgroundPort = port;
        /**
         * Messages background script => web page
         */
        port.onMessage.addListener((backgroundMessage) => {
            switch (backgroundMessage.type) {
                case "tabId": {
                    return;
                }
                case "isrecording":
                case "inspectanimation":
                case "scrubanimation": {
                    window.postMessage(backgroundMessage, "*");
                    return;
                }
            }
        });
        port.onDisconnect.addListener(() => {
            backgroundPort = undefined;
        });
    }
    function connect() {
        bindPortListeners(chrome.runtime.connect({ name: "client" }));
    }
    connect();
    chrome.runtime.onConnect.addListener(bindPortListeners);
    /**
     * Messages web page => background script
     */
    const handleMessagesFromWebPage = (event) => {
        if (event.source != window)
            return;
        if (!backgroundPort) {
            connect();
        }
        switch (event.data.type) {
            /**
             * Events from client to backend
             */
            case "animationstart":
            case "clientready":
            case "login": {
                backgroundPort.postMessage(event.data);
                return;
            }
        }
    };
    window.addEventListener("message", handleMessagesFromWebPage, false);

})();
