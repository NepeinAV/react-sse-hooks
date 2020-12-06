import * as React from 'react';

import { EventSourceContextInterface } from './types';

const EventSourceContext = React.createContext<EventSourceContextInterface<any>>({
    createConnection: () => undefined,
    getConnection: () => undefined,
});

export default EventSourceContext;