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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var useEventSourceListener = function (_a, dependencies) {
    var source = _a.source, event = _a.event, startOnInit = _a.startOnInit;
    if (dependencies === void 0) { dependencies = []; }
    var _b = React.useState(true), wasInit = _b[0], setInitState = _b[1];
    var name = event.name, listener = event.listener, options = event.options;
    var callback = function (event) {
        var parsedData = undefined;
        try {
            parsedData = JSON.parse(event.data);
        }
        catch (e) { }
        listener({ data: parsedData, event: event });
    };
    var createListener = function (source) {
        removeListener(source);
        source.addEventListener(name, callback, options);
        !wasInit && setInitState(false);
    };
    var removeListener = function (source) {
        source.removeEventListener(name, callback, options);
    };
    React.useEffect(function () {
        if (source && (wasInit || startOnInit)) {
            createListener(source);
            return function () {
                removeListener(source);
            };
        }
    }, __spreadArrays([source], dependencies));
    var startListening = React.useCallback(function () { return createListener(source); }, __spreadArrays([source], dependencies));
    var stopListening = React.useCallback(function () { return removeListener(source); }, __spreadArrays([source], dependencies));
    return { startListening: startListening, stopListening: stopListening };
};
exports.default = useEventSourceListener;
