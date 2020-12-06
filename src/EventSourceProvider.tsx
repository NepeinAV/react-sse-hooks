import * as React from 'react';
import { useState } from 'react';

import EventSourceContext from './EventSourceContext';

import {
    CreateConnectionFunc,
    EventSourceConnection,
    EventSourceProviderProps,
    EventSourceURL,
    GetConnectionFunc,
} from './types';

const EventSourceProvider = function({ eventSource, children }: React.PropsWithChildren<EventSourceProviderProps>) {
    const [connections, setConnections] = useState<Record<EventSourceURL, EventSourceConnection>>({});

    const createConnection: CreateConnectionFunc<any> = (url, options = {}) => {
        const connection = new eventSource(url, options);

        setConnections(
            Object.assign(
                {},
                connections,
                { [url]: connection }
            )
        );

        return connection;
    };

    const getConnection: GetConnectionFunc<any> = (url) => connections[url];

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