var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "react", "./EventSourceContext", "./exceptions/ImplementationNotExists"], function (require, exports, React, react_1, EventSourceContext_1, ImplementationNotExists_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    EventSourceContext_1 = __importDefault(EventSourceContext_1);
    ImplementationNotExists_1 = __importDefault(ImplementationNotExists_1);
    var EventSourceProvider = function (_a) {
        var eventSource = _a.eventSource, children = _a.children;
        var internalEventSource = typeof window !== 'undefined' && window.EventSource;
        var connections = react_1.useRef({});
        if (!internalEventSource && !eventSource)
            throw new ImplementationNotExists_1.default();
        var createConnection = function (url, options) {
            var _a;
            if (options === void 0) { options = {}; }
            var EventSourceImplementation = eventSource || internalEventSource;
            if (!EventSourceImplementation)
                throw new ImplementationNotExists_1.default();
            var connection = new EventSourceImplementation(url, options);
            connections.current = Object.assign({}, connections.current, (_a = {}, _a[url] = connection, _a));
            return connection;
        };
        var getConnection = function (url) { return connections.current[url]; };
        return (React.createElement(EventSourceContext_1.default.Provider, { value: {
                createConnection: createConnection,
                getConnection: getConnection,
            } }, children));
    };
    exports.default = EventSourceProvider;
});
