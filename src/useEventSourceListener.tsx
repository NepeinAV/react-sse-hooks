import * as React from 'react';

import { UseEventSourceListener } from './types';

const useEventSourceListener = function<T>(
    { source, event, startOnInit }: UseEventSourceListener<T>,
    dependencies: any[] = [],
) {
    const [wasInit, setInitState] = React.useState(true);

    const { name, listener, options } = event;

    const callback = (event: Event & { data: string }) => {
        let parsedData: T | undefined = undefined;

        try {
            parsedData = JSON.parse(event.data);
        } catch (e) {}

        listener({ data: parsedData, event, ...dependencies });
    }

    const createListener = (source: EventSource) => {
        removeListener(source);

        source.addEventListener(name, callback as any, options);
        !wasInit && setInitState(false);
    }

    const removeListener = (source: EventSource) => {
        source.removeEventListener(name, callback as any, options);
    }

    React.useEffect(() => {
        if (source && (wasInit || startOnInit)) {
            createListener(source);

            return () => {
                removeListener(source);
            }
        }
    }, [source, ...dependencies]);

    const startListening = React.useCallback(
        () => createListener(source),
        [source, ...dependencies],
    );

    const stopListening = React.useCallback(
        () => removeListener(source),
        [source, ...dependencies],
    )

    return { startListening, stopListening };
}

export default useEventSourceListener;