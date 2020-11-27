import * as React from 'react';

import { UseEventSourceListener } from './types';

const useEventSourceListener = function<T>(
    { source, event, startOnInit }: UseEventSourceListener<T>,
    dependencies: any[] = [],
) {
    const { name, listener, options } = event;

    const [isFirstListening, setFirstListening] = React.useState(true);

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
        isFirstListening && setFirstListening(false);
    }

    const removeListener = (source: EventSource) => {
        source.removeEventListener(name, callback as any, options);
    }

    React.useEffect(() => {
        if (source && (!isFirstListening || startOnInit)) {
            createListener(source);

            return () => {
                removeListener(source);
            }
        }
    }, [source, ...dependencies]);

    return {
        startListening: () => createListener(source),
        stopListening: () => removeListener(source),
    }
}

export default useEventSourceListener;