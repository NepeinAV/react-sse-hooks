import { UseEventSource } from './types';
declare const useEventSource: <I extends Record<string, any>, T extends EventSource = EventSource>({ source, options }: UseEventSource<I>) => T | undefined;
export default useEventSource;
