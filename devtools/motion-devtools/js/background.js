/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const dayMs = 60 * 60 * 1000 * 24;
const weekMs = dayMs * 7;
const maxAttempts = 3;
function checkAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = yield chrome.storage.sync.get("user");
        if (!user || new Date().getTime() - user.verifiedAt < weekMs)
            return;
        try {
            const response = yield fetch(`https://motion.dev/api/pro/check-subscription?username=${user.username}&email=${user.email}`);
            const { result } = yield response.json();
            if (result) {
                chrome.storage.sync.set({
                    user: Object.assign(Object.assign({}, user), { verifiedAt: new Date().getTime(), numRetryAttempts: 0 }),
                });
            }
            else {
                chrome.storage.sync.remove("user");
            }
        }
        catch (e) {
            if (user.numRetryAttempts < maxAttempts) {
                // Try again tomorrow
                chrome.storage.sync.set({
                    user: Object.assign(Object.assign({}, user), { verifiedAt: user.verifiedAt + dayMs, numRetryAttempts: user.numRetryAttempts + 1 }),
                });
            }
            else {
                chrome.storage.sync.remove("user");
            }
        }
    });
}

const devToolsConnections = new Map();
const clientConnections = new Map();
function getClientConnections(tabId) {
    let connections = clientConnections.get(tabId);
    if (!connections || !connections.size) {
        connections = new Map();
        const port = chrome.tabs.connect(tabId, { name: "client" });
        handleNewConnections(port, tabId);
        port.onDisconnect.addListener(() => console.log("port disconnected"));
        connections.set(0, port);
        clientConnections.set(tabId, connections);
    }
    return connections;
}
function sendMessageToClient(message, retry = true) {
    const tabConnections = getClientConnections(message.tabId);
    try {
        tabConnections.forEach((connection) => {
            connection.postMessage(message);
        });
    }
    catch (e) {
        clientConnections.delete(message.tabId);
        if (retry)
            sendMessageToClient(message, false);
    }
}
function handleNewConnections(port, manualTabId) {
    switch (port.name) {
        case "client": {
            const listener = (message, { sender }) => {
                var _a, _b, _c, _d, _e;
                let tabId = (_b = (_a = sender === null || sender === void 0 ? void 0 : sender.tab) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : manualTabId;
                let frameId = (_c = sender === null || sender === void 0 ? void 0 : sender.frameId) !== null && _c !== void 0 ? _c : 0;
                if (typeof tabId === "undefined") {
                    return console.error("No tabId defined");
                }
                if (message.type === "clientready") {
                    port.postMessage({ type: "tabId", tabId: (_e = (_d = sender === null || sender === void 0 ? void 0 : sender.tab) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : tabId });
                    const tabConnections = clientConnections.get(tabId) || new Map();
                    clientConnections.set(tabId, tabConnections);
                    tabConnections.set(frameId, port);
                    chrome.storage.sync.get("recordingTabs", ({ recordingTabs = {} }) => {
                        sendMessageToClient({
                            type: "isrecording",
                            tabId: tabId,
                            isRecording: recordingTabs[tabId] || false,
                        });
                    });
                }
                else {
                    const devToolsPort = devToolsConnections.get(tabId);
                    if (devToolsPort)
                        devToolsPort.postMessage(message);
                }
            };
            port.onMessage.addListener(listener);
            return;
        }
        case "devtools-page": {
            const listener = (message) => {
                switch (message.type) {
                    case "init": {
                        checkAuth();
                        devToolsConnections.set(message.tabId, port);
                        return;
                    }
                    case "isrecording": {
                        chrome.storage.sync.get("recordingTabs", ({ recordingTabs = {} }) => {
                            if (message.isRecording) {
                                recordingTabs[message.tabId] = true;
                            }
                            else {
                                delete recordingTabs[message.tabId];
                            }
                            chrome.storage.sync.set({ recordingTabs });
                        });
                        sendMessageToClient(message);
                        return;
                    }
                    case "inspectanimation":
                    case "scrubanimation": {
                        sendMessageToClient(message);
                        return;
                    }
                }
            };
            port.onMessage.addListener(listener);
            port.onDisconnect.addListener(() => {
                port.onMessage.removeListener(listener);
                devToolsConnections.forEach((connection, id) => {
                    connection === port && devToolsConnections.delete(id);
                });
            });
        }
    }
}

function clearTimelineOnReload(event) {
    const devToolsPort = devToolsConnections.get(event.tabId);
    if (devToolsPort) {
        const message = { type: "clear" };
        devToolsPort.postMessage(message);
    }
}

const handleLogin = (message, sender, sendResponse) => {
    // Only accept messages from motion.dev
    if (!sender.url || !sender.url.includes("motion.dev"))
        return;
    switch (message.type) {
        case "login": {
            const { username, email, isPro } = message;
            chrome.storage.sync.set({
                user: {
                    username,
                    isPro,
                    email,
                    verifiedAt: new Date().getTime(),
                    numRetryAttempts: 0,
                },
            }, () => sendResponse({ success: true }));
            break;
        }
    }
};

function forwardClientMessagesToDevTools(request, sender, sendResponse) {
    sendResponse(true);
    if (!sender.tab)
        return;
    const { id } = sender.tab;
    if (typeof id !== "number")
        return;
    const connection = devToolsConnections.get(id);
    connection === null || connection === void 0 ? void 0 : connection.postMessage(request);
}

chrome.runtime.onMessageExternal.addListener(handleLogin);
chrome.runtime.onConnect.addListener(handleNewConnections);
chrome.runtime.onMessage.addListener(forwardClientMessagesToDevTools);
chrome.webNavigation.onCommitted.addListener(clearTimelineOnReload, {
    url: [{ urlPrefix: "http" }, { urlPrefix: "localhost" }],
});
