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

const internalEventSource = window && window.EventSource;

const EventSourceProvider = function({ eventSource, children }: React.PropsWithChildren<EventSourceProviderProps>) {
    const connections = useRef<Record<EventSourceURL, EventSourceConnection>>({});

    if (!internalEventSource && !eventSource) throw new ImplementationNotExists();

    const createConnection: CreateConnectionFunc<any> = (url, options = {}) => {
        const EventSourceImplementation = eventSource || internalEventSource;
        const connection = new EventSourceImplementation(url, options);

        connections.current = Object.assign(
            {},
            connections,
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