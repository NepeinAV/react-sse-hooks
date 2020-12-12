var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import { parseJSONData } from './utils';
var useEventSourceListener = function (_a, dependencies) {
    var source = _a.source, event = _a.event, startOnInit = _a.startOnInit;
    if (dependencies === void 0) { dependencies = []; }
    var _b = React.useState(false), wasInit = _b[0], setInitState = _b[1];
    var _c = React.useState(false), wasStoppedManually = _c[0], setStoppedManuallyState = _c[1];
    var name = event.name, listener = event.listener, options = event.options;
    var callback = function (event) {
        listener({ data: parseJSONData(event.data), event: event });
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
        if (source && (wasInit || startOnInit) && !wasStoppedManually) {
            createListener(source);
            return function () {
                removeListener(source);
            };
        }
    }, __spreadArrays([source], dependencies));
    var startListening = React.useCallback(function () {
        createListener(source);
        setStoppedManuallyState(false);
    }, __spreadArrays([source], dependencies));
    var stopListening = React.useCallback(function () {
        removeListener(source);
        setStoppedManuallyState(true);
    }, __spreadArrays([source], dependencies));
    return { startListening: startListening, stopListening: stopListening };
};
export default useEventSourceListener;
