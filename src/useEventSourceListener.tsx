import * as React from 'react';

import { UseEventSourceListener } from './types';
import { parseJSONData } from './utils';

const useEventSourceListener = function<T = any>(
    { source, event, startOnInit }: UseEventSourceListener<T>,
    dependencies: any[] = [],
) {
    const [wasInit, setInitState] = React.useState(false);
    const [wasStoppedManually, setStoppedManuallyState] = React.useState(false);

    const { name, listener, options } = event;

    const callback = (event: Event & { data: string }) => {
        listener({ data: parseJSONData<T>(event.data), event });
    }

    const createListener = (source: EventSource) => {
        removeListener(source);

        source.addEventListener(name, callback as EventListenerOrEventListenerObject, options);
        !wasInit && setInitState(false);
    }

    const removeListener = (source: EventSource) => {
        source.removeEventListener(name, callback as EventListenerOrEventListenerObject, options);
    }

    React.useEffect(() => {
        if (source && (wasInit || startOnInit) && !wasStoppedManually) {
            createListener(source);

            return () => {
                removeListener(source);
            }
        }
    }, [source, ...dependencies]);

    const startListening = React.useCallback(
        () => {
            createListener(source);
            setStoppedManuallyState(false);
        },
        [source, ...dependencies],
    );

    const stopListening = React.useCallback(
        () => {
            removeListener(source);
            setStoppedManuallyState(true);
        },
        [source, ...dependencies],
    )

    return { startListening, stopListening };
}

export default useEventSourceListener;