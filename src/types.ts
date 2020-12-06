export type EventSourceURL = string;

export type EventSourceConnection = EventSource;

export type CreateConnectionFunc<T extends EventSource> =
    (url: string, options: EventSourceInit | undefined) => T | undefined;

export type GetConnectionFunc<T extends EventSource> = (url: EventSourceURL) => T | undefined;

export type EventSourceContextInterface<T extends EventSource> = {
    createConnection: CreateConnectionFunc<T>,
    getConnection: GetConnectionFunc<T>,
};

export type EventSourceProviderProps = {
    eventSource: typeof EventSource,
};

export type EventSourceEvent<T> = {
    name: string,
    listener: (event: { data: T | undefined, event: Event }) => void,
    options?: boolean | AddEventListenerOptions | EventListenerOptions,
};

export type UseEventSource<I> = {
    source: EventSourceURL,
    options?: EventSourceInit & I,
};

export type UseEventSourceListener<T> = {
    source: EventSourceConnection,
    event: EventSourceEvent<T>,
    startOnInit?: boolean,
};
