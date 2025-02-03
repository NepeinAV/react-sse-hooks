import * as React from 'react';
import { useRef } from 'react';

import EventSourceContext from './EventSourceContext';
import ImplementationNotExists from './exceptions/ImplementationNotExists';

import {
    CreateConnectionFunc,
    EventSourceConnection,
    EventSourceProviderProps,
    EventSourceURL,
    GetConnectionFunc,
} from './types';

const EventSourceProvider = function({ eventSource, children }: React.PropsWithChildren<EventSourceProviderProps>) {
    const internalEventSource = typeof window !== 'undefined' && window.EventSource;

    const connections = useRef<Record<EventSourceURL, EventSourceConnection>>({});

    if (!internalEventSource && !eventSource) throw new ImplementationNotExists();

    const createConnection: CreateConnectionFunc<any> = (url, options = {}) => {
        const EventSourceImplementation = eventSource || internalEventSource;
        if (!EventSourceImplementation) throw new ImplementationNotExists();

        const connection = new EventSourceImplementation(url, options);

        connections.current = Object.assign(
            {},
            connections.current,
            { [url]: connection },
        )

        return connection;
    };

    const getConnection: GetConnectionFunc<any> = (url) => connections.current[url];

    return (
        <EventSourceContext.Provider
            value={{
                createConnection,
                getConnection,
            }}
        >
            {children}
        </EventSourceContext.Provider>
    );
}

export default EventSourceProvider;
