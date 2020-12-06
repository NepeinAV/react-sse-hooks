import { UseEventSourceListener } from './types';
declare const useEventSourceListener: <T>({ source, event, startOnInit }: UseEventSourceListener<T>, dependencies?: any[]) => {
    startListening: () => void;
    stopListening: () => void;
};
export default useEventSourceListener;
