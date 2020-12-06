export declare type EventSourceURL = string;
export declare type EventSourceConnection = EventSource;
export declare type CreateConnectionFunc<T extends EventSource> = (url: string, options: EventSourceInit | undefined) => T | undefined;
export declare type GetConnectionFunc<T extends EventSource> = (url: EventSourceURL) => T | undefined;
export declare type EventSourceContextInterface<T extends EventSource> = {
    createConnection: CreateConnectionFunc<T>;
    getConnection: GetConnectionFunc<T>;
};
export declare type EventSourceProviderProps = {
    eventSource: typeof EventSource;
};
export declare type EventSourceEvent<T> = {
    name: string;
    listener: (event: {
        data: T | undefined;
        event: Event;
    }) => void;
    options?: boolean | AddEventListenerOptions | EventListenerOptions;
};
export declare type UseEventSource<I> = {
    source: EventSourceURL;
    options?: EventSourceInit & I;
};
export declare type UseEventSourceListener<T> = {
    source: EventSourceConnection;
    event: EventSourceEvent<T>;
    startOnInit?: boolean;
};
