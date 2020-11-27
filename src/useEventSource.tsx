import * as React from 'react';
import EventSourceContext from './EventSourceContext';
import { EventSourceContextInterface, UseEventSource } from './types';

const useEventSource = function<I extends Record<string, any>, T extends EventSource = EventSource>({ source, options }: UseEventSource<I>): T | undefined {
    const eventSourceContext = React.useContext<EventSourceContextInterface<T>>(EventSourceContext);
    const existingConnection = eventSourceContext.getConnection(source);

    if (!existingConnection) {
        return eventSourceContext.createConnection(source, options);
    }

    return existingConnection;
}

export default useEventSource;