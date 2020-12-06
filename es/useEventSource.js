import * as React from 'react';
import EventSourceContext from './EventSourceContext';
var useEventSource = function (_a) {
    var source = _a.source, options = _a.options;
    var eventSourceContext = React.useContext(EventSourceContext);
    var existingConnection = eventSourceContext.getConnection(source);
    if (!existingConnection) {
        return eventSourceContext.createConnection(source, options);
    }
    return existingConnection;
};
export default useEventSource;
