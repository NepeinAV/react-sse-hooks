"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var EventSourceContext_1 = __importDefault(require("./EventSourceContext"));
var EventSourceProvider = function (_a) {
    var eventSource = _a.eventSource, children = _a.children;
    var _b = react_1.useState({}), connections = _b[0], setConnections = _b[1];
    var createConnection = function (url, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var connection = new eventSource(url, options);
        setConnections(Object.assign({}, connections, (_a = {}, _a[url] = connection, _a)));
        return connection;
    };
    var getConnection = function (url) { return connections[url]; };
    return (React.createElement(EventSourceContext_1.default.Provider, { value: {
            createConnection: createConnection,
            getConnection: getConnection,
        } }, children));
};
exports.default = EventSourceProvider;
