import * as React from 'react';
import { useState } from 'react';
import EventSourceContext from './EventSourceContext';
var EventSourceProvider = function (_a) {
    var eventSource = _a.eventSource, children = _a.children;
    var _b = useState({}), connections = _b[0], setConnections = _b[1];
    var createConnection = function (url, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var connection = new eventSource(url, options);
        setConnections(Object.assign({}, connections, (_a = {}, _a[url] = connection, _a)));
        return connection;
    };
    var getConnection = function (url) { return connections[url]; };
    return (React.createElement(EventSourceContext.Provider, { value: {
            createConnection: createConnection,
            getConnection: getConnection,
        } }, children));
};
export default EventSourceProvider;
